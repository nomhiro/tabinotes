export default function SiteMenu({ currentPage }) {
  return (
    <nav className="site-menu" aria-label="メインメニュー">
      <style>{`
        .site-menu { display:flex; justify-content:safe center; overflow-x:auto; gap:.5rem; max-width:900px; margin:0 auto; padding:1rem 1.5rem; font-family:'Zen Maru Gothic',sans-serif; }
        .site-menu a { flex:0 0 auto; padding:.65rem 1rem; border:1px solid #ded7ce; border-radius:4px; color:#5a5048; background:white; text-decoration:none; font-size:.88rem; }
        .site-menu a:hover { background:#f0ece6; }
        .site-menu a[aria-current="page"] { color:white; background:#2a5a9a; border-color:#2a5a9a; }
        .site-menu a:focus-visible { outline:2px solid #2C2421; outline-offset:2px; }
        @media (prefers-reduced-motion: reduce) { .site-menu *, .site-menu *::before, .site-menu *::after { animation-duration:0.01ms!important; transition-duration:0.01ms!important; } }
      `}</style>
      <a href="#/" aria-current={currentPage === "list" ? "page" : undefined}>旅のしおり</a>
      <a href="#/translate" aria-current={currentPage === "translate" ? "page" : undefined}>音声翻訳</a>
    </nav>
  );
}
