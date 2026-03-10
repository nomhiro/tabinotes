export default function TripList({ trips }) {
  return (
    <div style={{ fontFamily: "'Noto Serif JP', 'Hiragino Mincho ProN', serif", background: "#F7F3ED", minHeight: "100vh", color: "#2C2421" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;600;700&family=Zen+Maru+Gothic:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .trip-list-header { text-align:center; padding:4rem 2rem 2rem; }
        .trip-list-label { font-family:'Zen Maru Gothic',sans-serif; font-size:.8rem; letter-spacing:.5em; color:#9a918a; margin-bottom:1rem; }
        .trip-list-title { font-size:clamp(2rem,5vw,3rem); font-weight:700; letter-spacing:.15em; color:#2C2421; }
        .trip-grid { max-width:900px; margin:0 auto; padding:1rem 1.5rem 4rem; display:grid; grid-template-columns:repeat(2,1fr); gap:1.5rem; }
        .trip-card { position:relative; border-radius:16px; overflow:hidden; cursor:pointer; transition:transform .3s,box-shadow .3s; min-height:200px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-decoration:none; color:white; animation:fadeUp .8s ease-out both; box-shadow:0 4px 20px rgba(0,0,0,.12); }
        .trip-card:hover { transform:translateY(-4px); box-shadow:0 12px 40px rgba(0,0,0,.2); }
        .trip-card::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 30% 80%,rgba(255,255,255,.1) 0%,transparent 50%); }
        .trip-card-pattern { position:absolute; inset:0; opacity:.05; background-image:repeating-linear-gradient(0deg,transparent,transparent 30px,#fff 30px,#fff 31px),repeating-linear-gradient(90deg,transparent,transparent 30px,#fff 30px,#fff 31px); }
        .trip-card-content { position:relative; z-index:2; text-align:center; padding:2rem; }
        .trip-card-icon { font-size:2.5rem; margin-bottom:.8rem; }
        .trip-card-title { font-size:clamp(1.2rem,3vw,1.6rem); font-weight:700; letter-spacing:.12em; margin-bottom:.3rem; text-shadow:0 2px 15px rgba(0,0,0,.2); }
        .trip-card-sub { font-size:clamp(.8rem,2vw,1rem); font-weight:300; letter-spacing:.2em; opacity:.85; margin-bottom:1.2rem; }
        .trip-card-date { font-family:'Zen Maru Gothic',sans-serif; display:inline-block; border:1px solid rgba(255,255,255,.35); padding:.4rem 1.2rem; font-size:.8rem; letter-spacing:.15em; border-radius:2px; }
        .trip-card-members { margin-top:.8rem; font-size:.78rem; opacity:.65; letter-spacing:.1em; font-family:'Zen Maru Gothic',sans-serif; }
        @media (max-width:600px) { .trip-grid{grid-template-columns:1fr;padding:1rem 1rem 3rem} .trip-card{min-height:180px} }
      `}</style>

      <div className="trip-list-header">
        <div className="trip-list-label">Travel Booklet</div>
        <div className="trip-list-title">旅のしおり</div>
      </div>

      <div className="trip-grid">
        {[...trips].sort((a, b) => {
          const parse = t => { const [y, m, d] = t.dates.split('—')[0].trim().split('.').map(Number); return new Date(y, m - 1, d); };
          return parse(b) - parse(a);
        }).map((trip, i) => (
          <a
            key={trip.id}
            className="trip-card"
            href={`#/trip/${trip.id}`}
            style={{
              background: `linear-gradient(160deg, ${trip.color} 0%, ${trip.colorEnd || trip.color} 100%)`,
              animationDelay: `${i * 0.15}s`,
            }}
          >
            <div className="trip-card-pattern" />
            <div className="trip-card-content">
              <div className="trip-card-icon">{trip.icon}</div>
              <div className="trip-card-title">{trip.title}</div>
              <div className="trip-card-sub">{trip.subtitle}</div>
              <div className="trip-card-date">{trip.dates}</div>
              <div className="trip-card-members">{trip.members}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
