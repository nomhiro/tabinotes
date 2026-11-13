import { useEffect, useRef, useState } from "react";

const LOCAL_LANGUAGES = [
  { code: "de-DE", target: "de", ttsLocale: "de-AT", label: "ドイツ語（オーストリア）" },
  { code: "hu-HU", target: "hu", ttsLocale: "hu-HU", label: "ハンガリー語" },
  { code: "cs-CZ", target: "cs", ttsLocale: "cs-CZ", label: "チェコ語" },
];

const TOKEN_ENDPOINT = import.meta.env.VITE_SPEECH_TOKEN_URL;
const MAX_TRANSLATIONS = 100;
// マイクを解放した直後は、端末の音声経路（通話用 → 通常の再生）の切り替えが終わるまで冒頭が欠けやすいので、
// 最初の1文だけ少し待ってから鳴らす
const RELEASE_LEAD_MS = 500;
const CAN_PLAY_AUDIO = typeof window !== "undefined" && typeof window.Audio === "function";
// マイクの音声処理（エコーキャンセル・ノイズ抑制・自動ゲイン）は使わない。
// - iOS: 有効にすると端末全体が通話用の音声処理経路に入り、読み上げ音声にもブツブツ音や途切れが出る
// - Android の Chrome: エコーキャンセルを有効にすると通話モードになり、音量ボタンが通話音量に切り替わる
// 読み上げ中はマイクを止めているのでスピーカー音の回り込み（エコー）は起きず、エコーキャンセルは不要。
const MIC_CONSTRAINTS = { audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } };

// iOS Safari は、ユーザー操作中に一度再生した <audio> 要素でないと後から自動で鳴らせない。
// その「最初の1回」に使う無音の WAV（0.1 秒）を作る。
function createSilentWavUrl() {
  const sampleRate = 8000;
  const samples = 800;
  const buffer = new ArrayBuffer(44 + samples * 2);
  const view = new DataView(buffer);
  const writeText = (offset, text) => {
    for (let i = 0; i < text.length; i++) view.setUint8(offset + i, text.charCodeAt(i));
  };
  writeText(0, "RIFF");
  view.setUint32(4, 36 + samples * 2, true);
  writeText(8, "WAVE");
  writeText(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeText(36, "data");
  view.setUint32(40, samples * 2, true);
  return URL.createObjectURL(new Blob([buffer], { type: "audio/wav" }));
}

async function getSpeechToken(signal) {
  if (!TOKEN_ENDPOINT) {
    throw new Error("翻訳APIの接続先が設定されていません。");
  }

  const response = await fetch(TOKEN_ENDPOINT, { method: "POST", signal, cache: "no-store" });
  if (!response.ok) {
    throw new Error("翻訳サービスに接続できませんでした。時間をおいて再度お試しください。");
  }

  const result = await response.json();
  if (typeof result.authorizationToken !== "string" || !result.authorizationToken ||
      typeof result.region !== "string" || !result.region) {
    throw new Error("翻訳サービスから有効な接続情報を取得できませんでした。");
  }
  return result;
}

function startRecognition(recognizer) {
  return new Promise((resolve, reject) => {
    recognizer.startContinuousRecognitionAsync(resolve, reject);
  });
}

function releaseCapture(capture) {
  capture.recognizer.close();
  capture.audioConfig.close();
  capture.stream.getTracks().forEach(track => track.stop());
}

// マイクを開いたままだと、スマートフォンでは再生音が通話用の経路（受話口・通話音量）に回って
// 最大音量でも非常に小さくなる。そのため読み上げ中はマイクを完全に解放し、終わったら取り直す。
async function closeCapture(session) {
  const capture = session.capture;
  if (!capture || capture.closing) return;
  capture.closing = true;
  // 停止処理中に確定する最後の認識結果は受け取りたいので、session.capture はまだ外さない
  await new Promise(resolve => {
    try {
      capture.recognizer.stopContinuousRecognitionAsync(resolve, resolve);
    } catch {
      resolve();
    }
  });
  if (session.capture !== capture) return;
  session.capture = null;
  releaseCapture(capture);
}

// 読み上げ待ちの文を捨てる（先読み済みの音声の URL も解放する）
function discardQueuedSpeech(session) {
  session.speechQueue.splice(0).forEach(item => {
    item.prepared.then(url => {
      if (url) URL.revokeObjectURL(url);
    });
  });
}

function disposeSession(session) {
  if (!session || session.disposed) return;
  session.disposed = true;
  discardQueuedSpeech(session);
  session.stopPlayback?.();
  session.controller.abort();
  window.clearTimeout(session.tokenTimeout);
  window.clearInterval(session.refreshTimer);
  if (session.capture) {
    releaseCapture(session.capture);
    session.capture = null;
  }
  if (session.player) {
    session.player.pause();
    session.player.removeAttribute("src");
    session.player.load();
  }
  if (session.unlockUrl) URL.revokeObjectURL(session.unlockUrl);
}

async function requestToken(session) {
  session.tokenTimeout = window.setTimeout(() => session.controller.abort(), 15_000);
  try {
    return await getSpeechToken(session.controller.signal);
  } finally {
    window.clearTimeout(session.tokenTimeout);
  }
}

// Azure のニューラル音声で翻訳文を合成し、WAV の音声データを返す
function synthesizeSpeech(session, text, locale) {
  const { sdk, token } = session;
  return new Promise((resolve, reject) => {
    const config = sdk.SpeechConfig.fromAuthorizationToken(token.authorizationToken, token.region);
    config.speechSynthesisLanguage = locale;
    config.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Riff24Khz16BitMonoPcm;
    // audioConfig に null を渡すと自動再生せず audioData だけを返す（先読みとマイクの解放タイミングを制御するため再生は自前で行う）
    const synthesizer = new sdk.SpeechSynthesizer(config, null);
    let settled = false;
    const settle = callback => value => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      synthesizer.close();
      callback(value);
    };
    const timer = window.setTimeout(settle(reject), 15_000, new Error("音声合成がタイムアウトしました。"));
    synthesizer.speakTextAsync(
      text,
      settle(result => {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) resolve(result.audioData);
        else reject(new Error(result.errorDetails || "音声合成に失敗しました。"));
      }),
      settle(error => reject(new Error(String(error)))),
    );
  });
}

// 合成を先に済ませて再生用の URL を作っておく（失敗時は null）。翻訳が確定した時点で先読みしておくことで、
// 文と文の間に合成の待ち時間が入って音が途切れるのを防ぐ。
async function prepareSpeech(session, text, locale) {
  try {
    const audioData = await synthesizeSpeech(session, text, locale);
    return URL.createObjectURL(new Blob([audioData], { type: "audio/wav" }));
  } catch {
    return null;
  }
}

// <audio> 要素で1文を再生する。Web Audio（AudioContext）は、iOS Safari ではマイクを使った後に
// 再生が途切れる・遅れる不具合が報告されているため使わない。音量の加工もしない。
// 再生し終わる・失敗する・止められる、のいずれかで解決する（false = 再生できなかった）。
function playClip(session, url, delayMs) {
  const audio = session.player;
  return new Promise(resolve => {
    let delayTimer;
    let guardTimer;
    const finish = played => {
      window.clearTimeout(delayTimer);
      window.clearTimeout(guardTimer);
      audio.onended = null;
      audio.onerror = null;
      audio.onloadedmetadata = null;
      if (session.stopPlayback === stop) session.stopPlayback = null;
      URL.revokeObjectURL(url);
      resolve(played);
    };
    const stop = () => {
      audio.pause();
      finish(true);
    };
    session.stopPlayback = stop;
    audio.onended = () => finish(true);
    audio.onerror = () => finish(false);
    // ended が届かなくても先へ進めるように、長さ + 2 秒で打ち切る（長さが分かるまでは 10 秒）
    audio.onloadedmetadata = () => {
      if (!Number.isFinite(audio.duration)) return;
      window.clearTimeout(guardTimer);
      guardTimer = window.setTimeout(() => finish(true), (audio.duration + 2) * 1000);
    };
    delayTimer = window.setTimeout(() => {
      guardTimer = window.setTimeout(() => finish(false), 10_000);
      audio.src = url;
      audio.play().catch(() => finish(false));
    }, delayMs);
  });
}

export default function LiveSpeechTranslator() {
  const [localLanguage, setLocalLanguage] = useState("de-DE");
  const [fromJapanese, setFromJapanese] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState("待機中");
  const [error, setError] = useState("");
  const [interimText, setInterimText] = useState("");
  const [translations, setTranslations] = useState([]);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const sessionRef = useRef(null);
  const autoSpeakRef = useRef(true);
  const selectedLanguage = LOCAL_LANGUAGES.find(language => language.code === localLanguage);
  const localLabel = selectedLanguage.label.split("（")[0];
  const sourceLanguage = fromJapanese ? "ja-JP" : selectedLanguage.code;
  const targetLanguage = fromJapanese ? selectedLanguage.target : "ja";
  const targetSpeechLocale = fromJapanese ? selectedLanguage.ttsLocale : "ja-JP";
  const sourceLabel = fromJapanese ? "日本語" : selectedLanguage.label;
  const targetLabel = fromJapanese ? selectedLanguage.label : "日本語";
  const targetShortLabel = fromJapanese ? localLabel : "日本語";
  const listeningStatus = `${sourceLabel}を聞き取り中です。${targetLabel}で表示します。`;

  useEffect(() => {
    return () => {
      disposeSession(sessionRef.current);
      sessionRef.current = null;
    };
  }, []);

  const endSession = (session, message = "") => {
    if (sessionRef.current !== session) return;
    sessionRef.current = null;
    disposeSession(session);
    setIsConnecting(false);
    setIsListening(false);
    setInterimText("");
    setStatus("翻訳を停止しました。");
    if (message) setError(message);
  };

  const changeDirection = (nextFromJapanese, nextLocalLanguage = localLanguage) => {
    endSession(sessionRef.current);
    setFromJapanese(nextFromJapanese);
    setLocalLanguage(nextLocalLanguage);
    setError("");
    setStatus("方向を切り替えました。開始を押してください。");
  };

  const handleAutoSpeakChange = checked => {
    autoSpeakRef.current = checked;
    setAutoSpeak(checked);
    const session = sessionRef.current;
    if (!checked && session) {
      discardQueuedSpeech(session);
      session.stopPlayback?.();
    }
  };

  const handleStart = async () => {
    if (sessionRef.current) return;
    const session = {
      controller: new AbortController(),
      disposed: false,
      sdk: null,
      token: null,
      capture: null,
      speechQueue: [],
      speaking: false,
      player: null,
      unlockUrl: null,
      stopPlayback: null,
    };
    sessionRef.current = session;

    // iOS Safari は、ユーザー操作中に一度再生した <audio> 要素でないと後から自動で鳴らせないため、
    // ボタンが押されたこの時点で無音を再生して、読み上げ用の要素を使える状態にしておく
    if (CAN_PLAY_AUDIO) {
      try {
        const player = new Audio();
        player.preload = "auto";
        session.unlockUrl = createSilentWavUrl();
        player.src = session.unlockUrl;
        player.play().catch(() => {});
        session.player = player;
      } catch {
        // 読み上げなしで翻訳だけ続ける
      }
    }

    setIsConnecting(true);
    setError("");
    setInterimText("");
    setStatus("翻訳サービスに接続しています…");

    const openCapture = async () => {
      const SpeechSDK = session.sdk;
      const stream = await navigator.mediaDevices.getUserMedia(MIC_CONSTRAINTS);
      if (session.disposed) {
        stream.getTracks().forEach(track => track.stop());
        return;
      }
      const config = SpeechSDK.SpeechTranslationConfig.fromAuthorizationToken(
        session.token.authorizationToken, session.token.region);
      config.speechRecognitionLanguage = sourceLanguage;
      config.addTargetLanguage(targetLanguage);
      const audioConfig = SpeechSDK.AudioConfig.fromStreamInput(stream);
      const recognizer = new SpeechSDK.TranslationRecognizer(config, audioConfig);
      const capture = { stream, audioConfig, recognizer, closing: false };
      session.capture = capture;
      // 読み上げのために解放したマイク（古い認識器）からのイベントは無視する
      const isCurrent = () => !session.disposed && session.capture === capture;

      recognizer.recognizing = (_, event) => {
        if (!isCurrent() || capture.closing) return;
        const result = event.result;
        if (result.reason === SpeechSDK.ResultReason.TranslatingSpeech) {
          setInterimText(result.translations.get(targetLanguage) || "");
        }
      };

      recognizer.recognized = (_, event) => {
        if (!isCurrent()) return;
        const result = event.result;
        if (result.reason === SpeechSDK.ResultReason.TranslatedSpeech) {
          const translatedText = result.translations.get(targetLanguage) || "";
          if (translatedText) {
            setTranslations(items => [
              ...items.slice(-(MAX_TRANSLATIONS - 1)),
              {
                id: result.resultId, source: result.text, translated: translatedText,
                language: sourceLanguage, targetLanguage, sourceLabel, targetLabel,
              },
            ]);
            if (session.player && autoSpeakRef.current) {
              session.speechQueue.push({
                prepared: prepareSpeech(session, translatedText, targetSpeechLocale),
              });
              drainSpeech();
            }
          }
          setInterimText("");
        }
      };

      recognizer.canceled = (_, event) => {
        if (!isCurrent() || capture.closing) return;
        endSession(session, event.reason === SpeechSDK.CancellationReason.Error
          ? "音声認識が中断されました。マイクの許可と接続状態を確認して、もう一度開始してください。"
          : "");
      };
      recognizer.sessionStopped = () => {
        if (!isCurrent() || capture.closing) return;
        endSession(session);
      };

      await startRecognition(recognizer);
    };

    // 溜まっている翻訳文を順に読み上げる。最初の再生前にマイクを解放し、
    // 溜まった分を読み終えたらマイクを取り直して聞き取りを再開する。
    // 合成は翻訳が確定した時点で先読みしてあるので、2文目以降は待たずにつなげて再生できる。
    const speakQueued = async () => {
      let released = false;
      let delayMs = RELEASE_LEAD_MS;
      while (!session.disposed && autoSpeakRef.current && session.speechQueue.length) {
        const item = session.speechQueue.shift();
        // 合成中はマイクを開いたままにして、話し始めの取りこぼしを防ぐ
        const url = await item.prepared;
        if (!url) {
          setStatus("読み上げ音声を取得できませんでした。翻訳は画面に表示されています。");
          continue;
        }
        if (session.disposed || !autoSpeakRef.current) {
          URL.revokeObjectURL(url);
          break;
        }
        if (!released) {
          released = true;
          await closeCapture(session);
          if (session.disposed) {
            URL.revokeObjectURL(url);
            return;
          }
          setStatus(`${targetShortLabel}で読み上げ中です（マイクは一時停止中）。`);
        }
        const played = await playClip(session, url, delayMs);
        delayMs = 0;
        if (!played) setStatus("読み上げ音声を再生できませんでした。翻訳は画面に表示されています。");
      }
      if (!released || session.disposed) return;
      try {
        await openCapture();
      } catch {
        endSession(session, "マイクを再開できませんでした。マイクの許可を確認して、もう一度開始してください。");
        return;
      }
      if (!session.disposed) setStatus(listeningStatus);
    };

    const drainSpeech = async () => {
      if (session.speaking) return;
      session.speaking = true;
      try {
        while (!session.disposed && autoSpeakRef.current && session.speechQueue.length) {
          await speakQueued();
        }
      } catch {
        endSession(session, "読み上げ中に問題が発生したため停止しました。もう一度開始してください。");
      } finally {
        session.speaking = false;
      }
    };

    try {
      session.sdk = await import("microsoft-cognitiveservices-speech-sdk");
      if (session.disposed) return;
      session.token = await requestToken(session);
      if (session.disposed) return;
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("このブラウザーでマイクを利用できません。HTTPSで開き、対応ブラウザーをお使いください。");
      }
      await openCapture();
      if (session.disposed) return;
      setIsConnecting(false);
      setIsListening(true);
      setStatus(listeningStatus);
      session.refreshTimer = window.setInterval(async () => {
        try {
          const refreshedToken = await requestToken(session);
          if (!session.disposed) {
            session.token = refreshedToken;
            if (session.capture) session.capture.recognizer.authorizationToken = refreshedToken.authorizationToken;
          }
        } catch {
          endSession(session, "接続を更新できなかったため翻訳を停止しました。もう一度開始してください。");
        }
      }, 8 * 60 * 1000);
    } catch (startError) {
      endSession(session, startError instanceof Error && /[぀-ヿ]/.test(startError.message)
        ? startError.message
        : "翻訳を開始できませんでした。マイクの許可と接続状態を確認してください。");
    }
  };

  const handleStop = () => {
    endSession(sessionRef.current);
  };

  return (
    <section className="eu-translation-section" aria-labelledby="eu-translation-title">
      <style>{`
        .eu-translation-section { display:flex; flex-direction:column; flex:1; min-width:0; padding:.5rem clamp(.75rem,2vw,1.5rem) max(.75rem,env(safe-area-inset-bottom)); }
        .eu-translation-heading { display:flex; align-items:baseline; justify-content:space-between; flex-wrap:wrap; column-gap:.75rem; }
        .eu-translation-title { margin:0; color:#2C2421; font-size:.95rem; font-weight:600; text-wrap:balance; }
        .eu-translation-help { flex:1; min-width:0; color:#6a6058; font-size:.75rem; line-height:1.75; }
        .eu-translation-help summary { width:fit-content; min-height:2.75rem; margin-left:auto; padding:.65rem .25rem; color:#5a5048; font-family:'Zen Maru Gothic',sans-serif; cursor:pointer; }
        .eu-translation-help summary:focus-visible { outline:2px solid #2C2421; outline-offset:2px; border-radius:4px; }
        .eu-translation-help[open] { flex-basis:100%; }
        .eu-translation-help-content { margin:0 0 .5rem; padding:.8rem 1rem; border:1px solid #ded7ce; border-radius:4px; background:white; text-wrap:pretty; }
        .eu-translation-help-content p { margin:0; }
        .eu-translation-help-content p + p { margin-top:.6rem; }
        .eu-translation-controls { display:grid; grid-template-columns:minmax(12rem,1fr) minmax(18rem,1.5fr) auto auto; align-items:center; gap:.5rem; }
        .eu-translation-direction { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:.35rem; }
        .eu-translation-direction-text { margin:0; color:#5a5048; font-family:'Zen Maru Gothic',sans-serif; font-size:.8rem; line-height:1.6; }
        .eu-translation-language { display:flex; align-items:center; gap:.5rem; color:#5a5048; font-family:'Zen Maru Gothic',sans-serif; font-size:.75rem; font-weight:700; }
        .eu-translation-language-label { flex:0 0 auto; }
        .eu-translation-select { width:100%; min-height:2.75rem; padding:.6rem .7rem; border:1px solid #bfb6ac; border-radius:4px; background:#fffefa; color:#2C2421; font:inherit; }
        .eu-translation-button { min-height:2.75rem; padding:.65rem .9rem; border:1px solid #2a5a9a; border-radius:4px; background:#2a5a9a; color:white; font-family:'Zen Maru Gothic',sans-serif; font-size:.8rem; font-weight:700; cursor:pointer; }
        .eu-translation-button:hover:not(:disabled) { background:#1d4374; }
        .eu-translation-button:disabled { cursor:not-allowed; opacity:.6; }
        .eu-translation-button-secondary { border-color:#756d65; background:white; color:#5a5048; }
        .eu-translation-button-secondary:hover:not(:disabled) { background:#f0ece6; color:#2C2421; }
        .eu-translation-select:focus-visible, .eu-translation-button:focus-visible { outline:2px solid #2C2421; outline-offset:2px; }
        .eu-translation-toggle { display:flex; align-items:center; gap:.5rem; width:fit-content; min-height:2.75rem; margin-top:.25rem; color:#5a5048; font-family:'Zen Maru Gothic',sans-serif; font-size:.8rem; font-weight:700; cursor:pointer; }
        .eu-translation-toggle input { flex:0 0 auto; width:1.25rem; height:1.25rem; margin:0; accent-color:#2a5a9a; cursor:pointer; }
        .eu-translation-toggle input:focus-visible { outline:2px solid #2C2421; outline-offset:2px; }
        .eu-translation-status { margin:.5rem 0; color:#756d65; font-family:'Zen Maru Gothic',sans-serif; font-size:.75rem; line-height:1.6; text-wrap:pretty; }
        .eu-translation-error { margin:.75rem 0 0; padding:.7rem .8rem; border:1px solid #e2c8bc; border-radius:4px; background:#fff3ed; color:#6e2e1a; font-size:.8rem; line-height:1.65; }
        .eu-translation-workspace { display:flex; flex-direction:column; flex:1; min-height:12rem; margin-top:.25rem; border:1px solid #ded7ce; border-radius:5px; background:white; }
        .eu-translation-results { display:grid; gap:0; margin:0; padding:0; list-style:none; }
        .eu-translation-results:empty { display:none; }
        .eu-translation-item { min-width:0; padding:.9rem 1rem; overflow-wrap:anywhere; }
        .eu-translation-item + .eu-translation-item { border-top:1px solid #e2dbd2; }
        .eu-translation-result-direction { margin:0 0 .5rem; color:#756d65; font-family:'Zen Maru Gothic',sans-serif; font-size:.72rem; }
        .eu-translation-source { margin:0 0 .35rem; color:#756d65; font-size:.78rem; line-height:1.6; text-wrap:pretty; }
        .eu-translation-output { margin:0; color:#2C2421; font-size:clamp(1.15rem,2vw,1.5rem); line-height:1.75; text-wrap:pretty; }
        .eu-translation-interim { background:#f0ece6; }
        .eu-translation-empty { display:grid; place-content:center; flex:1; margin:0; padding:1rem; color:#756d65; font-size:.85rem; line-height:1.75; text-align:center; text-wrap:pretty; }
        @media (max-width:1000px) { .eu-translation-controls { grid-template-columns:repeat(2,minmax(0,1fr)); } }
        @media (max-width:640px) { .eu-translation-language, .eu-translation-direction { grid-column:1 / -1; } .eu-translation-select { flex:1; min-width:0; } }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration:0.01ms!important; transition-duration:0.01ms!important; } }
      `}</style>
      <div className="eu-translation-heading">
        <h2 className="eu-translation-title" id="eu-translation-title">リアルタイム翻訳</h2>
        <details className="eu-translation-help">
          <summary>使い方・注意事項</summary>
          <div className="eu-translation-help-content">
            <p>
              現地語と翻訳方向を選んで開始してください。相手の言葉を日本語で読むことも、自分の日本語を現地語で相手に見せることもできます。
            </p>
            <p>
              インターネット接続とマイクの許可が必要です。開始すると周囲の音声がAzureに送信されます。
              相手の同意を得て利用してください。表示は直近100件までで、画面を離れると消えます。
            </p>
            <p id="eu-translation-direction-help">
              言語や方向を変えると聞き取りを停止します。切替後に「翻訳を開始」を押してください。確定済みの翻訳は残ります。
            </p>
            <p>
              翻訳が確定すると、翻訳先の言語でAzureの音声により自動的に読み上げます。
              マイクを開いたままだとスマートフォンの再生音が小さくなるため、読み上げ中はマイクを一時停止し、終わると自動で再開します。
              音が小さいときは端末の音量を上げてください。
            </p>
          </div>
        </details>
      </div>
      <div className="eu-translation-controls">
        <label className="eu-translation-language" htmlFor="eu-translation-language">
          <span className="eu-translation-language-label">現地語</span>
          <select
            className="eu-translation-select"
            id="eu-translation-language"
            value={localLanguage}
            aria-describedby="eu-translation-direction-help"
            onChange={event => changeDirection(fromJapanese, event.target.value)}>
            {LOCAL_LANGUAGES.map(language => (
              <option key={language.code} value={language.code}>{language.label}</option>
            ))}
          </select>
        </label>
        <div className="eu-translation-direction">
          <p className="eu-translation-direction-text">
            <strong>{fromJapanese ? "日本語" : localLabel}</strong> <span aria-label="から">→</span> <strong>{fromJapanese ? localLabel : "日本語"}</strong>
          </p>
          <button
            className="eu-translation-button eu-translation-button-secondary"
            type="button"
            aria-label={`翻訳方向を入れ替える：${targetLabel}から${sourceLabel}へ`}
            aria-describedby="eu-translation-direction-help"
            onClick={() => changeDirection(!fromJapanese)}>
            <span aria-hidden="true">⇄</span> 入れ替え
          </button>
        </div>
        {!isListening && !isConnecting ? (
          <button
            className="eu-translation-button"
            type="button"
            onClick={handleStart}>
            <span aria-hidden="true">🎙️</span> 翻訳を開始
          </button>
        ) : (
          <button
            className="eu-translation-button eu-translation-button-secondary"
            type="button"
            onClick={handleStop}>
            停止
          </button>
        )}
        <button
          className="eu-translation-button eu-translation-button-secondary"
          type="button"
          disabled={translations.length === 0 && !interimText}
          onClick={() => { setTranslations([]); setInterimText(""); }}>
          表示を消去
        </button>
      </div>
      {CAN_PLAY_AUDIO && (
        <label className="eu-translation-toggle">
          <input
            type="checkbox"
            checked={autoSpeak}
            onChange={event => handleAutoSpeakChange(event.target.checked)} />
          <span>翻訳結果を{targetShortLabel}で自動的に読み上げる</span>
        </label>
      )}
      <p className="eu-translation-status" role="status" aria-live="polite">{status}</p>
      {error && <p className="eu-translation-error" role="alert">{error}</p>}
      <div className="eu-translation-workspace">
      <ol className="eu-translation-results" aria-label="翻訳結果">
        {translations.map(item => (
          <li className="eu-translation-item" key={item.id}>
            <p className="eu-translation-result-direction">{item.sourceLabel} → {item.targetLabel}</p>
            <p className="eu-translation-source" lang={item.language}>{item.source}</p>
            <p className="eu-translation-output" lang={item.targetLanguage}>{item.translated}</p>
          </li>
        ))}
        {interimText && (
          <li className="eu-translation-item eu-translation-interim">
            <p className="eu-translation-output" lang={targetLanguage}>{interimText}</p>
          </li>
        )}
      </ol>
      {translations.length === 0 && !interimText && (
        <p className="eu-translation-empty">「翻訳を開始」を押して話してください。<br />ここに翻訳が表示されます。</p>
      )}
      </div>
    </section>
  );
}
