import { useEffect, useRef, useState } from "react";

// 会話フレーズ帳（日本語と複数の現地語を横並びで比較し、音声を再生する）
// props:
//   langs       … [{ code, locale, label, city, dayLabel, flag, accent }]
//   categories  … [{ id, label, icon }]
//   phrases     … [{ id, cat, ja, [code]: { text, kana, note? } }]
//   audioBase   … 音声ファイルの置き場所（末尾スラッシュ付き）。{audioBase}{code}/{id}.mp3 / {id}-slow.mp3
//   currentLang … 滞在中の言語コード（強調表示する列）。無ければ null

const srOnly = { position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)", whiteSpace: "nowrap" };

export default function PhraseBook({ langs, categories, phrases, audioBase, currentLang = null }) {
  const [activeCat, setActiveCat] = useState("all");
  const [hideLocal, setHideLocal] = useState(false);
  const [revealed, setRevealed] = useState(() => new Set());
  const [playing, setPlaying] = useState(null);
  const [notice, setNotice] = useState("");
  const [enlarged, setEnlarged] = useState(null);

  const audioRef = useRef(null);
  const playIdRef = useRef(0);
  const dialogRef = useRef(null);
  const openerRef = useRef(null);

  const stop = () => {
    playIdRef.current += 1;
    audioRef.current?.pause();
    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    setPlaying(null);
  };

  useEffect(() => () => {
    playIdRef.current += 1;
    audioRef.current?.pause();
    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
  }, []);

  // 音声ファイルが無い・読めないときは端末の読み上げで代わりに再生する
  const speakFallback = (playId, lang, text, slow) => {
    if (playId !== playIdRef.current) return;
    const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
    if (!synth || typeof SpeechSynthesisUtterance === "undefined") {
      setPlaying(null);
      setNotice("音声を再生できませんでした");
      return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang.locale;
    utter.rate = slow ? 0.6 : 0.9;
    const done = () => { if (playId === playIdRef.current) setPlaying(null); };
    utter.onend = done;
    utter.onerror = done;
    synth.cancel();
    synth.speak(utter);
  };

  const play = (phrase, lang, slow) => {
    const key = `${phrase.id}:${lang.code}:${slow ? "slow" : "normal"}`;
    if (playing === key) { stop(); return; }
    stop();
    setNotice("");
    const playId = playIdRef.current;
    const text = phrase[lang.code].text;
    setPlaying(key);

    if (typeof window === "undefined" || typeof window.Audio !== "function") {
      speakFallback(playId, lang, text, slow);
      return;
    }
    const audio = audioRef.current ?? (audioRef.current = new Audio());
    let fellBack = false;
    const fallback = () => {
      if (fellBack || playId !== playIdRef.current) return;
      fellBack = true;
      speakFallback(playId, lang, text, slow);
    };
    audio.onended = () => { if (playId === playIdRef.current) setPlaying(null); };
    audio.onerror = fallback;
    audio.src = `${audioBase}${lang.code}/${phrase.id}${slow ? "-slow" : ""}.mp3`;
    audio.play().catch((err) => { if (err?.name !== "AbortError") fallback(); });
  };

  const openEnlarged = (phrase, lang, e) => {
    openerRef.current = e.currentTarget;
    setEnlarged({ phrase, lang });
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (enlarged && !dialog.open) dialog.showModal?.();
  }, [enlarged]);

  const handleDialogClose = () => {
    setEnlarged(null);
    openerRef.current?.focus?.();
  };

  const closeDialog = () => dialogRef.current?.close?.();

  const toggleHide = () => {
    setHideLocal((v) => !v);
    setRevealed(new Set());
  };

  const reveal = (key) => setRevealed((prev) => new Set(prev).add(key));

  const visibleCats = categories.filter((c) => activeCat === "all" || c.id === activeCat);

  const renderPlayButtons = (phrase, lang, large = false) => {
    const normalKey = `${phrase.id}:${lang.code}:normal`;
    const slowKey = `${phrase.id}:${lang.code}:slow`;
    return (
      <div className={`pb-actions${large ? " pb-actions-large" : ""}`}>
        <button type="button" className={`pb-play${playing === normalKey ? " is-playing" : ""}`}
          aria-label={playing === normalKey ? "停止" : `${lang.label}で「${phrase.ja}」を再生`}
          onClick={() => play(phrase, lang, false)}>
          <span aria-hidden="true">{playing === normalKey ? "■" : "▶"}</span>
          {large && <span className="pb-play-text">{playing === normalKey ? "停止" : "再生"}</span>}
        </button>
        <button type="button" className={`pb-play pb-play-slow${playing === slowKey ? " is-playing" : ""}`}
          aria-label={playing === slowKey ? "停止" : `${lang.label}で「${phrase.ja}」をゆっくり再生`}
          onClick={() => play(phrase, lang, true)}>
          <span aria-hidden="true">{playing === slowKey ? "■" : "🐢"}</span>
          {large && <span className="pb-play-text">{playing === slowKey ? "停止" : "ゆっくり"}</span>}
        </button>
      </div>
    );
  };

  return (
    <div className="pb-wrap">
      <style>{`
        .pb-wrap { max-width:960px; margin:0 auto; padding:2.5rem 1.25rem 4rem; font-family:'Zen Maru Gothic',sans-serif; animation:pbFadeIn .4s ease-out; }
        @keyframes pbFadeIn { from{opacity:0} to{opacity:1} }
        .pb-title { font-family:'Noto Serif JP',serif; font-size:1.5rem; font-weight:700; letter-spacing:.08em; text-align:center; margin-bottom:.4rem; }
        .pb-lead { text-align:center; font-size:.82rem; color:#756d65; line-height:1.7; margin-bottom:1.5rem; }
        .pb-legend { list-style:none; display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:.5rem; margin-bottom:1.25rem; }
        .pb-legend-item { background:white; border-radius:8px; border-top:3px solid var(--pb-accent); padding:.55rem .6rem; text-align:center; box-shadow:0 1px 4px rgba(0,0,0,.05); }
        .pb-legend-item.is-current { box-shadow:0 0 0 2px var(--pb-accent); }
        .pb-legend-lang { display:block; font-weight:700; font-size:.88rem; color:#2C2421; }
        .pb-legend-city { display:block; font-size:.72rem; color:#6a6058; margin-top:.1rem; }
        .pb-nowrap { white-space:nowrap; }
        .pb-legend-now { display:inline-block; margin-top:.3rem; font-size:.66rem; font-weight:700; color:white; background:var(--pb-accent); border-radius:999px; padding:.05rem .5rem; }
        .pb-toolbar { display:flex; flex-wrap:wrap; align-items:center; gap:.4rem; padding:.6rem 0; background:#F7F3ED; margin-bottom:.5rem; }
        .pb-chip { font-family:inherit; font-size:.8rem; color:#5a5048; background:white; border:1px solid #ded7ce; border-radius:999px; padding:.45rem .85rem; min-height:2.5rem; cursor:pointer; }
        .pb-chip:hover { background:#f0ece6; }
        .pb-chip[aria-pressed="true"] { color:white; background:#2C2421; border-color:#2C2421; }
        .pb-chip:focus-visible { outline:2px solid #2C2421; outline-offset:2px; }
        .pb-hide-toggle { margin-left:auto; }
        .pb-hide-toggle[aria-pressed="true"] { background:#7a3b8f; border-color:#7a3b8f; }
        .pb-notice { font-size:.78rem; color:#9a4a2a; margin:.25rem 0 .5rem; }
        .pb-section { margin-top:1.5rem; }
        .pb-section-title { font-family:'Noto Serif JP',serif; font-size:1.05rem; font-weight:700; letter-spacing:.05em; margin-bottom:.6rem; padding-bottom:.35rem; border-bottom:1px solid #ded7ce; }
        .pb-list { list-style:none; display:flex; flex-direction:column; gap:.6rem; }
        .pb-item { display:grid; grid-template-columns:10rem repeat(3,minmax(0,1fr)); gap:.5rem; align-items:stretch; }
        .pb-ja { display:flex; align-items:center; font-family:'Noto Serif JP',serif; font-weight:600; font-size:1rem; line-height:1.5; color:#2C2421; padding:.4rem .2rem; }
        .pb-cell { position:relative; display:flex; flex-direction:column; gap:.2rem; background:white; border-radius:8px; border-top:3px solid var(--pb-accent); padding:.55rem .6rem .6rem; box-shadow:0 1px 4px rgba(0,0,0,.05); min-width:0; }
        .pb-cell.is-current { box-shadow:0 0 0 2px var(--pb-accent); }
        .pb-cell-lang { font-size:.66rem; color:#756d65; letter-spacing:.02em; }
        .pb-text-btn { font-family:'Noto Serif JP',serif; text-align:left; background:none; border:none; padding:.1rem 0; cursor:zoom-in; font-size:1.05rem; font-weight:700; color:#2C2421; line-height:1.35; overflow-wrap:anywhere; border-radius:3px; }
        .pb-text-btn:hover .pb-text { text-decoration:underline; text-decoration-style:dotted; text-underline-offset:3px; }
        .pb-text-btn:focus-visible { outline:2px solid #2C2421; outline-offset:2px; }
        .pb-zoom { font-size:.7rem; color:#756d65; margin-left:.25rem; font-weight:400; }
        .pb-kana { font-size:.76rem; color:#6a6058; line-height:1.4; overflow-wrap:anywhere; }
        .pb-reveal { font-family:inherit; text-align:left; font-size:.78rem; color:#5a5048; background:repeating-linear-gradient(45deg,#f3eee7,#f3eee7 6px,#ebe4da 6px,#ebe4da 12px); border:1px dashed #c9bfb3; border-radius:6px; padding:.6rem .5rem; cursor:pointer; min-height:3.2rem; }
        .pb-reveal:focus-visible { outline:2px solid #2C2421; outline-offset:2px; }
        .pb-note { font-size:.68rem; color:#756d65; line-height:1.5; margin-top:.1rem; }
        .pb-actions { display:flex; gap:.35rem; margin-top:auto; padding-top:.3rem; }
        .pb-play { flex:1 1 0; display:inline-flex; align-items:center; justify-content:center; gap:.35rem; min-height:2.75rem; min-width:2.75rem; font-family:inherit; font-size:.95rem; color:#2C2421; background:#f4efe8; border:1px solid #ded7ce; border-radius:8px; cursor:pointer; }
        .pb-play:hover { background:#ebe4da; }
        .pb-play:focus-visible { outline:2px solid #2C2421; outline-offset:2px; }
        .pb-play.is-playing { color:white; background:var(--pb-accent,#2C2421); border-color:var(--pb-accent,#2C2421); }
        .pb-play-text { font-size:.85rem; }
        .pb-dialog { border:none; border-radius:16px; padding:0; width:min(92vw,560px); max-height:90dvh; background:white; color:#2C2421; box-shadow:0 20px 60px rgba(0,0,0,.3); }
        .pb-dialog::backdrop { background:rgba(20,16,14,.6); }
        .pb-dialog-inner { position:relative; padding:2.5rem 1.5rem 1.5rem; border-top:6px solid var(--pb-accent); text-align:center; font-family:'Zen Maru Gothic',sans-serif; }
        .pb-dialog-lang { font-size:.82rem; color:#756d65; margin-bottom:1rem; }
        .pb-dialog-text { font-family:'Noto Serif JP',serif; font-size:clamp(2rem,9vw,3.6rem); font-weight:700; line-height:1.25; overflow-wrap:anywhere; margin-bottom:.75rem; }
        .pb-dialog-kana { font-size:1.05rem; color:#6a6058; margin-bottom:.4rem; }
        .pb-dialog-ja { font-family:'Noto Serif JP',serif; font-size:1rem; color:#5a5048; margin-bottom:1.5rem; }
        .pb-actions-large .pb-play { min-height:3.25rem; font-size:1.1rem; }
        .pb-dialog-close { position:absolute; top:.6rem; right:.6rem; width:2.75rem; height:2.75rem; font-size:1.2rem; color:#5a5048; background:none; border:none; border-radius:50%; cursor:pointer; }
        .pb-dialog-close:hover { background:#f0ece6; }
        .pb-dialog-close:focus-visible { outline:2px solid #2C2421; outline-offset:2px; }
        @media (max-width:640px) {
          .pb-wrap { padding:1.75rem .75rem 3rem; }
          .pb-item { grid-template-columns:repeat(3,minmax(0,1fr)); gap:.35rem; }
          .pb-ja { grid-column:1 / -1; padding:.2rem .1rem 0; font-size:.98rem; }
          .pb-cell { padding:.45rem .4rem .45rem; }
          .pb-text-btn { font-size:.92rem; }
          .pb-zoom { display:none; }
          .pb-kana { font-size:.68rem; }
          .pb-actions { gap:.25rem; }
          .pb-play { min-width:0; min-height:2.5rem; font-size:.85rem; }
          .pb-legend { gap:.35rem; }
          .pb-legend-lang { font-size:.8rem; }
          .pb-hide-toggle { margin-left:0; }
        }
        @media (prefers-reduced-motion: reduce) { .pb-wrap, .pb-wrap *, .pb-wrap *::before, .pb-wrap *::after { animation-duration:0.01ms!important; transition-duration:0.01ms!important; } }
      `}</style>

      <h2 className="pb-title">旅の会話フレーズ</h2>
      <p className="pb-lead">
        3か国の言葉を横並びで比べられます。▶ で再生、🐢 でゆっくり再生。<br />
        現地語の文字を押すと大きく表示されるので、通じないときはそのまま見せてください。
      </p>

      <ul className="pb-legend" aria-label="訪問先と言葉">
        {langs.map((lang) => (
          <li key={lang.code} className={`pb-legend-item${currentLang === lang.code ? " is-current" : ""}`} style={{ "--pb-accent": lang.accent }}>
            <span className="pb-legend-lang"><span aria-hidden="true">{lang.flag}</span> {lang.label}</span>
            <span className="pb-legend-city">{lang.city} <span className="pb-nowrap">{lang.dayLabel}</span></span>
            {currentLang === lang.code && <span className="pb-legend-now">表示中の日</span>}
          </li>
        ))}
      </ul>

      <div className="pb-toolbar" role="group" aria-label="フレーズの絞り込み">
        <button type="button" className="pb-chip" aria-pressed={activeCat === "all"} onClick={() => setActiveCat("all")}>すべて</button>
        {categories.map((c) => (
          <button key={c.id} type="button" className="pb-chip" aria-pressed={activeCat === c.id} onClick={() => setActiveCat(c.id)}>
            <span aria-hidden="true">{c.icon}</span> {c.label}
          </button>
        ))}
        <button type="button" className="pb-chip pb-hide-toggle" aria-pressed={hideLocal} onClick={toggleHide}>
          <span aria-hidden="true">🙈</span> 現地語をかくす
        </button>
      </div>

      <div aria-live="polite" style={srOnly}>
        {hideLocal ? "現地語をかくしています。思い出してから押すと表示されます" : ""}
      </div>
      {notice && <p className="pb-notice" role="alert">{notice}</p>}

      {visibleCats.map((cat) => (
        <section key={cat.id} className="pb-section" aria-labelledby={`pb-cat-${cat.id}`}>
          <h3 id={`pb-cat-${cat.id}`} className="pb-section-title"><span aria-hidden="true">{cat.icon}</span> {cat.label}</h3>
          <ul className="pb-list">
            {phrases.filter((p) => p.cat === cat.id).map((phrase) => (
              <li key={phrase.id} className="pb-item">
                <p className="pb-ja">{phrase.ja}</p>
                {langs.map((lang) => {
                  const entry = phrase[lang.code];
                  if (!entry) return <div key={lang.code} />;
                  const cellKey = `${phrase.id}:${lang.code}`;
                  const isHidden = hideLocal && !revealed.has(cellKey);
                  return (
                    <div key={lang.code} className={`pb-cell${currentLang === lang.code ? " is-current" : ""}`} style={{ "--pb-accent": lang.accent }}>
                      <span className="pb-cell-lang"><span aria-hidden="true">{lang.flag}</span> {lang.label}</span>
                      {isHidden ? (
                        <button type="button" className="pb-reveal" onClick={() => reveal(cellKey)}>
                          タップで表示<span style={srOnly}>（{lang.label}で「{phrase.ja}」）</span>
                        </button>
                      ) : (
                        <>
                          <button type="button" className="pb-text-btn" onClick={(e) => openEnlarged(phrase, lang, e)}>
                            <span className="pb-text" lang={lang.locale}>{entry.text}</span>
                            <span className="pb-zoom" aria-hidden="true">⤢</span>
                            <span style={srOnly}>（大きく表示）</span>
                          </button>
                          <span className="pb-kana">{entry.kana}</span>
                          {entry.note && <span className="pb-note">{entry.note}</span>}
                        </>
                      )}
                      {renderPlayButtons(phrase, lang)}
                    </div>
                  );
                })}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <dialog ref={dialogRef} className="pb-dialog" aria-labelledby="pb-dialog-text" onClose={handleDialogClose}
        onClick={(e) => { if (e.target === e.currentTarget) closeDialog(); }}
        style={enlarged ? { "--pb-accent": enlarged.lang.accent } : undefined}>
        {enlarged && (
          <div className="pb-dialog-inner">
            <button type="button" className="pb-dialog-close" aria-label="閉じる" onClick={closeDialog}>✕</button>
            <p className="pb-dialog-lang"><span aria-hidden="true">{enlarged.lang.flag}</span> {enlarged.lang.label}（{enlarged.lang.city}）</p>
            <p id="pb-dialog-text" className="pb-dialog-text" lang={enlarged.lang.locale}>{enlarged.phrase[enlarged.lang.code].text}</p>
            <p className="pb-dialog-kana">{enlarged.phrase[enlarged.lang.code].kana}</p>
            <p className="pb-dialog-ja">{enlarged.phrase.ja}</p>
            {renderPlayButtons(enlarged.phrase, enlarged.lang, true)}
          </div>
        )}
      </dialog>
    </div>
  );
}
