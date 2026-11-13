import { useEffect, useRef, useState } from "react";

const LOCAL_LANGUAGES = [
  { code: "de-DE", target: "de", ttsLocale: "de-AT", label: "ドイツ語（オーストリア）" },
  { code: "hu-HU", target: "hu", ttsLocale: "hu-HU", label: "ハンガリー語" },
  { code: "cs-CZ", target: "cs", ttsLocale: "cs-CZ", label: "チェコ語" },
];

const TOKEN_ENDPOINT = import.meta.env.VITE_SPEECH_TOKEN_URL;
const MAX_TRANSLATIONS = 100;
const MIN_VOLUME = 100;
const MAX_VOLUME = 300;
const DEFAULT_VOLUME = 150;
const VOLUME_STORAGE_KEY = "speech-translator-volume";
const TARGET_PEAK = 0.9;
const MAX_NORMALIZE_GAIN = 4;
// マイクを解放した直後は出力経路が切り替わり切るまで冒頭が欠けやすいので、最初の1文だけ少し待ってから鳴らす
const RELEASE_LEAD_SECONDS = 0.25;
// 音量を最大 300% にしたときのピーク（0.9 × 3 = 2.7）まで、ソフトクリップの入力範囲に収める
const CLIP_HEADROOM = 3;
const SOFT_CLIP_KNEE = 0.8;
const AudioContextClass = typeof window !== "undefined"
  ? (window.AudioContext || window.webkitAudioContext)
  : undefined;

// 時間で変化しない（メモリレスな）ソフトクリップ。0.8 までは素通しで、それを超えるピークだけを
// なだらかに 1.0 以内へ収める。コンプレッサーのように発話中に音量が上下することはない。
// 入力は音量ゲイン後の信号を CLIP_HEADROOM で割ったものなので、カーブ側で掛け戻している。
function createSoftClipCurve() {
  const size = 8192;
  const curve = new Float32Array(size);
  for (let i = 0; i < size; i++) {
    const level = ((i / (size - 1)) * 2 - 1) * CLIP_HEADROOM;
    const magnitude = Math.abs(level);
    curve[i] = magnitude <= SOFT_CLIP_KNEE
      ? level
      : Math.sign(level) * (SOFT_CLIP_KNEE + (1 - SOFT_CLIP_KNEE) * Math.tanh((magnitude - SOFT_CLIP_KNEE) / (1 - SOFT_CLIP_KNEE)));
  }
  return curve;
}

const volumeToGain = volume => volume / 100 / CLIP_HEADROOM;

function loadVolume() {
  try {
    const saved = Number(window.localStorage.getItem(VOLUME_STORAGE_KEY));
    return saved >= MIN_VOLUME && saved <= MAX_VOLUME ? saved : DEFAULT_VOLUME;
  } catch {
    return DEFAULT_VOLUME;
  }
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

function setAudioSessionType(type) {
  try {
    if (navigator.audioSession) navigator.audioSession.type = type;
  } catch {
    // 未対応のブラウザーでは何もしない
  }
}

function disposeSession(session) {
  if (!session || session.disposed) return;
  session.disposed = true;
  session.speechQueue.length = 0;
  try {
    session.playingSource?.stop();
  } catch {
    // 再生前に停止済み
  }
  session.controller.abort();
  window.clearTimeout(session.tokenTimeout);
  window.clearInterval(session.refreshTimer);
  if (session.capture) {
    releaseCapture(session.capture);
    session.capture = null;
  }
  Promise.resolve(session.audioContext?.close()).catch(() => {});
  setAudioSessionType("auto");
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
    // audioConfig に null を渡すと自動再生せず audioData だけを返す（再生は音量調整のため自前で行う）
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

// 合成と WAV のデコードを先に済ませておく（失敗時は null）。翻訳が確定した時点で先読みしておくことで、
// 文と文の間に合成の待ち時間が入って音が途切れるのを防ぐ。
async function prepareSpeech(session, text, locale) {
  try {
    const audioData = await synthesizeSpeech(session, text, locale);
    const buffer = await session.audioContext.decodeAudioData(audioData);
    let peak = 0;
    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
      const samples = buffer.getChannelData(channel);
      for (let i = 0; i < samples.length; i++) peak = Math.max(peak, Math.abs(samples[i]));
    }
    // 発話ごとにピークをそろえる固定ゲイン。コンプレッサーと違い、発話の途中で音量が動くことはない
    return { buffer, normalize: peak > 0 ? Math.min(TARGET_PEAK / peak, MAX_NORMALIZE_GAIN) : 1 };
  } catch {
    return null;
  }
}

async function playPrepared(session, { buffer, normalize }, lead) {
  const context = session.audioContext;
  await context.resume();
  if (session.disposed) return;
  await new Promise(resolve => {
    const source = context.createBufferSource();
    source.buffer = buffer;
    const normalizer = context.createGain();
    normalizer.gain.value = normalize;
    source.connect(normalizer);
    normalizer.connect(session.gainNode);
    source.onended = () => {
      normalizer.disconnect();
      if (session.playingSource === source) session.playingSource = null;
      resolve();
    };
    session.playingSource = source;
    source.start(context.currentTime + lead);
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
  const [volume, setVolume] = useState(loadVolume);
  const sessionRef = useRef(null);
  const autoSpeakRef = useRef(true);
  const volumeRef = useRef(volume);
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
      session.speechQueue.length = 0;
      try {
        session.playingSource?.stop();
      } catch {
        // 再生前に停止済み
      }
    }
  };

  const handleVolumeChange = value => {
    volumeRef.current = value;
    setVolume(value);
    const gain = sessionRef.current?.gainNode?.gain;
    if (gain) gain.value = volumeToGain(value);
    try {
      window.localStorage.setItem(VOLUME_STORAGE_KEY, String(value));
    } catch {
      // 保存できなくても動作には影響しない
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
      playingSource: null,
      audioContext: null,
      gainNode: null,
    };
    sessionRef.current = session;

    // iOS Safari などはユーザー操作中に作って有効化した AudioContext でないと後から鳴らせない。
    // 音量を上げられるようゲインを通し、音割れは時間で変化しないソフトクリップで抑えて出力する。
    if (AudioContextClass) {
      try {
        let context;
        try {
          // 読み上げは遅延より途切れにくさを優先する（携帯では小さいバッファだと音が途切れやすい）
          context = new AudioContextClass({ latencyHint: "playback" });
        } catch {
          context = new AudioContextClass();
        }
        Promise.resolve(context.resume?.()).catch(() => {});
        const gainNode = context.createGain();
        gainNode.gain.value = volumeToGain(volumeRef.current);
        const softClip = context.createWaveShaper();
        softClip.curve = createSoftClipCurve();
        softClip.oversample = "2x";
        gainNode.connect(softClip);
        softClip.connect(context.destination);
        session.audioContext = context;
        session.gainNode = gainNode;
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
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
            if (session.audioContext && autoSpeakRef.current) {
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
      let lead = RELEASE_LEAD_SECONDS;
      while (!session.disposed && autoSpeakRef.current && session.speechQueue.length) {
        const item = session.speechQueue.shift();
        // 合成中はマイクを開いたままにして、話し始めの取りこぼしを防ぐ
        const prepared = await item.prepared;
        if (!prepared) {
          setStatus("読み上げ音声を取得できませんでした。翻訳は画面に表示されています。");
          continue;
        }
        if (session.disposed || !autoSpeakRef.current) break;
        if (!released) {
          released = true;
          await closeCapture(session);
          if (session.disposed) return;
          setStatus(`${targetShortLabel}で読み上げ中です（マイクは一時停止中）。`);
          setAudioSessionType("playback");
        }
        try {
          await playPrepared(session, prepared, lead);
          lead = 0;
        } catch {
          setStatus("読み上げ音声を再生できませんでした。翻訳は画面に表示されています。");
        }
      }
      if (!released || session.disposed) return;
      setAudioSessionType("auto");
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
        .eu-translation-options { display:flex; align-items:center; flex-wrap:wrap; gap:0 1.25rem; margin-top:.25rem; }
        .eu-translation-toggle, .eu-translation-volume { display:flex; align-items:center; gap:.5rem; min-height:2.75rem; color:#5a5048; font-family:'Zen Maru Gothic',sans-serif; font-size:.8rem; font-weight:700; }
        .eu-translation-toggle { width:fit-content; cursor:pointer; }
        .eu-translation-toggle input { flex:0 0 auto; width:1.25rem; height:1.25rem; margin:0; accent-color:#2a5a9a; cursor:pointer; }
        .eu-translation-volume input { width:min(11rem,40vw); min-height:2.75rem; margin:0; accent-color:#2a5a9a; cursor:pointer; }
        .eu-translation-volume output { min-width:2.75rem; font-variant-numeric:tabular-nums; }
        .eu-translation-toggle input:focus-visible, .eu-translation-volume input:focus-visible { outline:2px solid #2C2421; outline-offset:2px; }
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
              音が小さいときは「読み上げ音量」を上げてください。
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
      {AudioContextClass && (
        <div className="eu-translation-options">
          <label className="eu-translation-toggle">
            <input
              type="checkbox"
              checked={autoSpeak}
              onChange={event => handleAutoSpeakChange(event.target.checked)} />
            <span>翻訳結果を{targetShortLabel}で自動的に読み上げる</span>
          </label>
          <label className="eu-translation-volume" htmlFor="eu-translation-volume">
            <span>読み上げ音量</span>
            <input
              id="eu-translation-volume"
              type="range"
              min={MIN_VOLUME}
              max={MAX_VOLUME}
              step="25"
              value={volume}
              aria-valuetext={`${volume}%`}
              onChange={event => handleVolumeChange(Number(event.target.value))} />
            <output htmlFor="eu-translation-volume" aria-hidden="true">{volume}%</output>
          </label>
        </div>
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
