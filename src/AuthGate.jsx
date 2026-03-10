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
      `}</style>
      <div style={styles.card}>
        <div style={styles.icon}>🧳</div>
        <div style={styles.title}>旅のしおり</div>
        <div style={styles.subtitle}>メールアドレスを入力してください</div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            placeholder="example@gmail.com"
            style={styles.input}
            autoFocus
          />
          <button type="submit" style={styles.button}>ログイン</button>
        </form>
        {error && <div style={styles.error}>{error}</div>}
      </div>
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
    color: "#9a918a",
    letterSpacing: ".08em",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: ".8rem",
  },
  input: {
    fontFamily: "'Zen Maru Gothic', sans-serif",
    fontSize: ".95rem",
    padding: ".75rem 1rem",
    border: "1px solid #d9d3cc",
    borderRadius: "8px",
    outline: "none",
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
