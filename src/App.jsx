import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient.js";
import InvoiceApp from "./InvoiceApp.jsx";

export default function App() {
  const [session, setSession] = useState(undefined); // undefined = loading, null = signed out

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div style={styles.centerScreen}>
        <div style={styles.spinner} />
      </div>
    );
  }

  if (!session) {
    return <Login />;
  }

  return <InvoiceApp session={session} />;
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
  };

  return (
    <div style={styles.centerScreen}>
      <form onSubmit={handleSubmit} style={styles.loginCard}>
        <div style={styles.loginTitle}>Genesis Incorporated</div>
        <div style={styles.loginSubtitle}>Sign in to manage invoices</div>

        <label style={styles.label}>Email</label>
        <input
          style={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />

        <label style={styles.label}>Password</label>
        <input
          style={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <div style={styles.error}>{error}</div>}

        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  centerScreen: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f6f7f9",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Roboto, sans-serif",
  },
  spinner: {
    width: 28,
    height: 28,
    border: "3px solid #e5e7eb",
    borderTopColor: "#2f6fed",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loginCard: {
    width: 320,
    background: "#fff",
    borderRadius: 14,
    border: "1px solid #ecedf1",
    padding: 28,
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
  },
  loginTitle: { fontSize: 18, fontWeight: 800, color: "#1f2a44" },
  loginSubtitle: { fontSize: 13, color: "#8a93a3", marginBottom: 18 },
  label: { fontSize: 12.5, fontWeight: 700, color: "#5b6472", marginBottom: 5, marginTop: 10 },
  input: {
    boxSizing: "border-box",
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #dfe3ea",
    fontSize: 14,
    outline: "none",
  },
  button: {
    marginTop: 18,
    background: "#2f6fed",
    color: "#fff",
    border: "none",
    borderRadius: 9,
    padding: "11px 16px",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
  },
  error: {
    marginTop: 12,
    fontSize: 12.5,
    color: "#c0392b",
    background: "#fef1f1",
    border: "1px solid #f6d9d6",
    borderRadius: 8,
    padding: "8px 10px",
  },
};
