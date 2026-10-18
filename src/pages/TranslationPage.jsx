import LiveSpeechTranslator from "../components/LiveSpeechTranslator.jsx";
import SiteMenu from "../components/SiteMenu.jsx";

export default function TranslationPage() {
  return (
    <div className="translation-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600;700&family=Zen+Maru+Gothic:wght@400;500;700&display=swap');
        body:has(.translation-page) { margin:0; }
        .translation-page { min-height:100dvh; display:flex; flex-direction:column; background:#F7F3ED; color:#2C2421; font-family:'Noto Serif JP','Hiragino Mincho ProN',serif; }
        .translation-page *, .translation-page *::before, .translation-page *::after { box-sizing:border-box; }
        .translation-page-header { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:.25rem .75rem; padding:.5rem clamp(.75rem,2vw,1.5rem); border-bottom:1px solid #ded7ce; }
        .translation-page-header h1 { margin:0; font-size:1.15rem; font-weight:700; text-wrap:balance; }
        .translation-page-header .site-menu { max-width:100%; margin:0; padding:0; gap:.35rem; }
        .translation-page-header .site-menu a { display:flex; align-items:center; min-height:2.75rem; padding:.5rem .65rem; font-size:.78rem; }
        .translation-page main { display:flex; flex:1; min-width:0; }
        @media (prefers-reduced-motion: reduce) { .translation-page *, .translation-page *::before, .translation-page *::after { animation-duration:0.01ms!important; transition-duration:0.01ms!important; } }
      `}</style>
      <header className="translation-page-header">
        <h1>音声翻訳</h1>
        <SiteMenu currentPage="translate" />
      </header>
      <main>
        <LiveSpeechTranslator />
      </main>
    </div>
  );
}
