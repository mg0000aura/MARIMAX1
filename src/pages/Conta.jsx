import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

/**
 * MARIMAX — Área do Cliente
 * -----------------------------------------------------------------------
 * Login persistente já vem de graça: src/firebase.js configura
 * browserLocalPersistence, então o Firebase mantém a sessão salva no
 * navegador sozinho. Este componente só escuta onAuthStateChanged.
 */
const FAKE_AUTH = auth;

export default function Conta() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState("perfil");

  useEffect(() => {
    if (!FAKE_AUTH) return;
    const unsub = onAuthStateChanged(FAKE_AUTH, (u) => setUser(u));
    return () => unsub();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!FAKE_AUTH) {
      setError("Conecte o marimax-firebase.js para ativar login de verdade.");
      return;
    }
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(FAKE_AUTH, email, pass);
      } else {
        await createUserWithEmailAndPassword(FAKE_AUTH, email, pass);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="mx-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Space+Mono:wght@400;700&family=Work+Sans:wght@300;400;500;600&display=swap');
        :root{ --navy:#0B0E1A; --navy-2:#12172B; --gold:#B08A4E; --gold-soft:#C9A96E; --bone:#F3EFE6; --line:rgba(243,239,230,0.14); }
        .mx-root{ background:var(--navy); color:var(--bone); font-family:'Work Sans',sans-serif; min-height:100vh; display:flex; align-items:center; justify-content:center; padding:40px 6vw; }
        .mx-root *{ box-sizing:border-box; }

        .auth-card{ width:100%; max-width:380px; background:var(--navy-2); border:1px solid var(--line); padding:40px 32px; border-radius:2px; }
        .auth-title{ font-family:'Fraunces',serif; font-size:24px; margin:0 0 6px; text-align:center; }
        .auth-sub{ text-align:center; font-size:12.5px; color:rgba(243,239,230,0.5); margin-bottom:28px; }
        .field{ margin-bottom:16px; }
        .field label{ display:block; font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:rgba(243,239,230,0.5); margin-bottom:6px; }
        .field input{ width:100%; background:var(--navy); border:1px solid var(--line); color:var(--bone); padding:11px 13px; font-size:13.5px; border-radius:2px; outline:none; }
        .field input:focus{ border-color:var(--gold-soft); }
        .error{ font-size:12px; color:#D08A6B; margin-bottom:14px; }
        .btn-solid{ width:100%; background:var(--gold); color:var(--navy); font-weight:600; border:1px solid var(--gold); padding:13px; border-radius:2px; cursor:pointer; font-size:13px; letter-spacing:.03em; }
        .btn-solid:hover{ background:var(--gold-soft); }
        .switch{ text-align:center; margin-top:18px; font-size:12.5px; color:rgba(243,239,230,0.55); }
        .switch button{ background:none; border:none; color:var(--gold-soft); cursor:pointer; font-size:12.5px; text-decoration:underline; }

        .dash{ width:100%; max-width:900px; }
        .dash-head{ display:flex; justify-content:space-between; align-items:center; margin-bottom:30px; }
        .dash-title{ font-family:'Fraunces',serif; font-size:24px; margin:0; }
        .logout{ font-size:12px; border:1px solid var(--line); padding:9px 16px; border-radius:2px; cursor:pointer; background:transparent; color:var(--bone); }
        .logout:hover{ border-color:var(--gold-soft); color:var(--gold-soft); }

        .tabs{ display:flex; gap:6px; margin-bottom:26px; border-bottom:1px solid var(--line); }
        .tab{ padding:10px 16px; font-size:12.5px; cursor:pointer; color:rgba(243,239,230,0.5); border-bottom:2px solid transparent; }
        .tab.active{ color:var(--gold-soft); border-bottom-color:var(--gold-soft); }
        .panel{ font-size:13.5px; color:rgba(243,239,230,0.7); line-height:1.7; }
      `}</style>

      {!user ? (
        <div className="auth-card">
          <h1 className="auth-title">MARIMAX</h1>
          <p className="auth-sub">{mode === "login" ? "Entre na sua conta" : "Criar conta"}</p>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>E-mail</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="field">
              <label>Senha</label>
              <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} required />
            </div>
            {error && <div className="error">{error}</div>}
            <button type="submit" className="btn-solid">{mode === "login" ? "Entrar" : "Criar conta"}</button>
          </form>
          <div className="switch">
            {mode === "login" ? (
              <>Não tem conta? <button onClick={() => setMode("signup")}>Criar agora</button></>
            ) : (
              <>Já tem conta? <button onClick={() => setMode("login")}>Entrar</button></>
            )}
          </div>
        </div>
      ) : (
        <div className="dash">
          <div className="dash-head">
            <h1 className="dash-title">Olá, {user.email}</h1>
            <button className="logout" onClick={() => signOut(FAKE_AUTH)}>Sair</button>
          </div>
          <div className="tabs">
            {["perfil", "pedidos", "favoritos", "cupons", "dados"].map((t) => (
              <div key={t} className={`tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
                {t[0].toUpperCase() + t.slice(1)}
              </div>
            ))}
          </div>
          <div className="panel">
            {tab === "perfil" && "Resumo da conta — pedidos recentes e status."}
            {tab === "pedidos" && "Histórico de pedidos aparece aqui (ligar ao Firestore)."}
            {tab === "favoritos" && "Produtos favoritados pelo cliente."}
            {tab === "cupons" && "Cupons disponíveis para uso."}
            {tab === "dados" && "Dados pessoais e opções de suporte."}
          </div>
        </div>
      )}
    </div>
  );
}
