import { useState, useEffect } from 'react';

const ALLOWED_EMAIL = "hirorino12040710@gmail.com";
const STORAGE_KEY = "auth_email";

export default function AuthGate({ children }) {
  const [authorized, setAuthorized] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEY) === ALLOWED_EMAIL;
  });
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const normalized = email.trim().toLowerCase();
    if (normalized === ALLOWED_EMAIL) {
      sessionStorage.setItem(STORAGE_KEY, normalized);
      setAuthorized(true);
      setError("");
    } else {
      setError("このメールアドレスではアクセスできません");
    }
  };

  if (authorized) return children;

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;600;700&family=Zen+Maru+Gothic:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        #auth-email:focus-visible { outline:2px solid #4A7C59; outline-offset:2px; border-radius:8px; }
        button[type="submit"]:focus-visible { outline:2px solid #2C2421; outline-offset:2px; border-radius:8px; }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration:0.01ms!important; transition-duration:0.01ms!important; } }
      `}</style>
      <main style={styles.card}>
        <div style={styles.icon} aria-hidden="true">🧳</div>
        <h1 style={styles.title}>旅のしおり</h1>
        <div style={styles.subtitle} id="login-desc">メールアドレスを入力してください</div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label htmlFor="auth-email" style={styles.label}>メールアドレス</label>
          <input
            id="auth-email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            placeholder="example@gmail.com"
            style={styles.input}
            autoFocus
            aria-describedby={error ? "auth-error" : "login-desc"}
            aria-invalid={error ? "true" : undefined}
            required
          />
          <button type="submit" style={styles.button}>ログイン</button>
        </form>
        {error && <div id="auth-error" style={styles.error} role="alert">{error}</div>}
      </main>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Noto Serif JP', 'Hiragino Mincho ProN', serif",
    background: "#F7F3ED",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.5rem",
    color: "#2C2421",
  },
  card: {
    background: "white",
    borderRadius: "16px",
    padding: "3rem 2.5rem",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 4px 24px rgba(0,0,0,.06)",
    animation: "fadeIn .6s ease-out both",
  },
  icon: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: 700,
    letterSpacing: ".12em",
    marginBottom: ".5rem",
  },
  subtitle: {
    fontFamily: "'Zen Maru Gothic', sans-serif",
    fontSize: ".85rem",
    color: "#756d65",
    letterSpacing: ".08em",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: ".8rem",
  },
  label: {
    fontFamily: "'Zen Maru Gothic', sans-serif",
    fontSize: ".82rem",
    color: "#5a5048",
    textAlign: "left",
    letterSpacing: ".05em",
  },
  input: {
    fontFamily: "'Zen Maru Gothic', sans-serif",
    fontSize: ".95rem",
    padding: ".75rem 1rem",
    border: "1px solid #d9d3cc",
    borderRadius: "8px",
    color: "#2C2421",
    background: "#FAFAF8",
  },
  button: {
    fontFamily: "'Noto Serif JP', serif",
    fontSize: ".95rem",
    fontWeight: 500,
    padding: ".75rem",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(160deg, #6B8F71 0%, #4A7C59 100%)",
    color: "white",
    cursor: "pointer",
    letterSpacing: ".15em",
  },
  error: {
    fontFamily: "'Zen Maru Gothic', sans-serif",
    fontSize: ".82rem",
    color: "#c0392b",
    marginTop: ".8rem",
  },
};
