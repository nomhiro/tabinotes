import { useEffect, useRef, useState } from "react";

const LOCAL_LANGUAGES = [
  { code: "de-DE", target: "de", label: "ドイツ語（オーストリア）" },
  { code: "hu-HU", target: "hu", label: "ハンガリー語" },
  { code: "cs-CZ", target: "cs", label: "チェコ語" },
];

const TOKEN_ENDPOINT = import.meta.env.VITE_SPEECH_TOKEN_URL;
const MAX_TRANSLATIONS = 100;

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

function disposeSession(session) {
  if (!session || session.disposed) return;
  session.disposed = true;
  session.controller.abort();
  window.clearTimeout(session.tokenTimeout);
  window.clearInterval(session.refreshTimer);
  session.stream?.getTracks().forEach(track => track.stop());
  session.recognizer?.close();
  session.audioConfig?.close();
}

async function requestToken(session) {
  session.tokenTimeout = window.setTimeout(() => session.controller.abort(), 15_000);
  try {
    return await getSpeechToken(session.controller.signal);
  } finally {
    window.clearTimeout(session.tokenTimeout);
  }
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
  const sessionRef = useRef(null);
  const selectedLanguage = LOCAL_LANGUAGES.find(language => language.code === localLanguage);
  const localLabel = selectedLanguage.label.split("（")[0];
  const sourceLanguage = fromJapanese ? "ja-JP" : selectedLanguage.code;
  const targetLanguage = fromJapanese ? selectedLanguage.target : "ja";
  const sourceLabel = fromJapanese ? "日本語" : selectedLanguage.label;
  const targetLabel = fromJapanese ? selectedLanguage.label : "日本語";

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

  const handleStart = async () => {
    if (sessionRef.current) return;
    const session = { controller: new AbortController(), disposed: false };
    sessionRef.current = session;
    setIsConnecting(true);
    setError("");
    setInterimText("");
    setStatus("翻訳サービスに接続しています…");

    try {
      const SpeechSDK = await import("microsoft-cognitiveservices-speech-sdk");
      if (session.disposed) return;
      const { authorizationToken, region } = await requestToken(session);
      if (session.disposed) return;
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("このブラウザーでマイクを利用できません。HTTPSで開き、対応ブラウザーをお使いください。");
      }
      session.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (session.disposed) {
        session.stream.getTracks().forEach(track => track.stop());
        return;
      }
      const config = SpeechSDK.SpeechTranslationConfig.fromAuthorizationToken(authorizationToken, region);
      config.speechRecognitionLanguage = sourceLanguage;
      config.addTargetLanguage(targetLanguage);
      session.audioConfig = SpeechSDK.AudioConfig.fromStreamInput(session.stream);
      const recognizer = new SpeechSDK.TranslationRecognizer(config, session.audioConfig);
      session.recognizer = recognizer;

      recognizer.recognizing = (_, event) => {
        if (session.disposed) return;
        const result = event.result;
        if (result.reason === SpeechSDK.ResultReason.TranslatingSpeech) {
          setInterimText(result.translations.get(targetLanguage) || "");
        }
      };

      recognizer.recognized = (_, event) => {
        if (session.disposed) return;
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
          }
          setInterimText("");
        }
      };

      recognizer.canceled = (_, event) => {
        endSession(session, event.reason === SpeechSDK.CancellationReason.Error
          ? "音声認識が中断されました。マイクの許可と接続状態を確認して、もう一度開始してください。"
          : "");
      };
      recognizer.sessionStopped = () => endSession(session);

      await startRecognition(recognizer);
      if (session.disposed) return;
      setIsConnecting(false);
      setIsListening(true);
      setStatus(`${sourceLabel}を聞き取り中です。${targetLabel}で表示します。`);
      session.refreshTimer = window.setInterval(async () => {
        try {
          const refreshedToken = await requestToken(session);
          if (!session.disposed) {
            recognizer.authorizationToken = refreshedToken.authorizationToken;
          }
        } catch {
          endSession(session, "接続を更新できなかったため翻訳を停止しました。もう一度開始してください。");
        }
      }, 8 * 60 * 1000);
    } catch (startError) {
      endSession(session, startError instanceof Error && /[\u3040-\u30ff]/.test(startError.message)
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
