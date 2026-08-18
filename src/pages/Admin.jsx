import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS, currency } from "../data/products";

/**
 * MARIMAX ADM — Painel Administrativo
 * -----------------------------------------------------------------------
 * Identidade separada do site público (preto/branco, sem dourado),
 * mas com o mesmo princípio visual: fundo escuro com brilho suave atrás
 * dos elementos, cards soltos em vez de tabelas cruas com grade pesada.
 */
const NAV = [
  { key: "dashboard", label: "Estatísticas", icon: "◧" },
  { key: "produtos", label: "Produtos", icon: "◫" },
  { key: "pedidos", label: "Pedidos", icon: "▤" },
  { key: "clientes", label: "Clientes", icon: "◔" },
  { key: "usuarios", label: "Usuários", icon: "◈" },
  { key: "banners", label: "Banners", icon: "▭" },
  { key: "promocoes", label: "Promoções / Cupons", icon: "◆" },
  { key: "noticias", label: "Novidades / Blog", icon: "▥" },
  { key: "textos", label: "Textos do site", icon: "▦" },
];

const STATS = {
  visitantes: 0, visualizacoes: 0, vendas: 0, faturamento: 0,
  conversao: 0, clientesNovos: 0, clientesRecorrentes: 0,
};

function MonoMark() {
  return (
    <svg viewBox="0 0 220 220" width="24" height="24" fill="none">
      <polygon points="110,14 206,110 110,206 14,110" stroke="#F5F5F5" strokeWidth="3" />
      <path d="M70 66 L110 132 L150 66 M78 66 L78 154 M142 66 L142 154" stroke="#F5F5F5" strokeWidth="3" strokeLinecap="square" />
    </svg>
  );
}

function StatCard({ label, value, money }) {
  const display = value === 0 ? "—" : money ? value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : value;
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{display}</div>
    </div>
  );
}

function EmptyCard({ text }) {
  return <div className="empty-card">{text}</div>;
}

function ProductRow({ p }) {
  const first = p.variants[0];
  const withOriginal = p.variants.find((v) => v.original);
  const off = withOriginal ? Math.round((1 - withOriginal.price / withOriginal.original) * 100) : null;
  const lowest = p.variants.reduce((min, v) => (v.price < min ? v.price : min), first.price);

  return (
    <div className="prod-row">
      <div className="prod-thumb">
        {off && <span className="badge-off">↓ {off}%</span>}
      </div>
      <div className="prod-info">
        <span className="prod-tag">{p.tag}</span>
        <h4 className="prod-name">{p.name}</h4>
        <span className="prod-cat">{p.category} · {p.variants.length} {p.variants.length > 1 ? "opções" : "opção"}</span>
      </div>
      <div className="prod-price">
        {withOriginal && <span className="prod-original">{currency(withOriginal.original)}</span>}
        <span className="prod-final">{currency(lowest)}</span>
      </div>
      <div className="prod-actions">
        <button className="adm-btn line small">Editar</button>
        <button className="adm-btn line small danger">Remover</button>
      </div>
    </div>
  );
}

export default function Admin() {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="mx-adm">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');
        :root{
          --bg:#08090A; --panel:#131315; --card:#17181B;
          --line:rgba(255,255,255,0.06); --ink:#F5F5F5; --ink-dim:#8C8C8C; --white:#FFFFFF;
        }
        .mx-adm{ position:relative; background:var(--bg); color:var(--ink); font-family:'Space Grotesk', sans-serif; min-height:100vh; display:flex; overflow:hidden; }
        .mx-adm *{ box-sizing:border-box; }
        .mx-adm a{ color:inherit; text-decoration:none; }

        .fx{ position:fixed; inset:0; z-index:0; pointer-events:none; }
        .fx::before{ content:''; position:absolute; top:-15%; left:20%; width:50vw; height:50vw; background:radial-gradient(circle, rgba(255,255,255,0.05), transparent 60%); filter:blur(50px); }

        .sidebar{ position:relative; z-index:1; width:230px; flex-shrink:0; background:var(--panel); padding:22px 0; display:flex; flex-direction:column; border-right:1px solid var(--line); }
        .side-logo{ display:flex; align-items:center; gap:10px; padding:0 20px 20px; margin-bottom:8px; }
        .side-word{ font-size:13px; letter-spacing:.14em; }
        .side-word b{ font-weight:600; }
        .side-tag{ font-family:'Space Mono',monospace; font-size:9px; letter-spacing:.12em; color:var(--ink-dim); display:block; }

        .side-link{ display:flex; align-items:center; gap:10px; padding:10px 20px; margin:2px 10px; font-size:13px; color:var(--ink-dim); cursor:pointer; border-radius:10px; transition:all .15s; }
        .side-link .ic{ font-size:13px; opacity:.7; width:16px; text-align:center; }
        .side-link:hover{ color:var(--ink); background:rgba(255,255,255,0.03); }
        .side-link.active{ color:var(--white); background:rgba(255,255,255,0.07); }
        .side-back{ margin-top:auto; padding:14px 20px 0; font-size:11.5px; color:var(--ink-dim); }
        .side-back:hover{ color:var(--ink); }

        .main{ position:relative; z-index:1; flex:1; padding:30px 40px; overflow-x:auto; }
        .main-head{ display:flex; justify-content:space-between; align-items:center; margin-bottom:26px; }
        .main-title{ font-size:21px; font-weight:600; margin:0; }
        .badge{ font-family:'Space Mono',monospace; font-size:10px; letter-spacing:.1em; color:var(--ink-dim); border:1px solid var(--line); padding:5px 11px; border-radius:20px; }

        .stats-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(170px,1fr)); gap:12px; margin-bottom:32px; }
        .stat-card{ background:var(--card); border-radius:14px; padding:20px; box-shadow:0 0 0 1px rgba(255,255,255,0.03); transition:transform .15s; }
        .stat-card:hover{ transform:translateY(-2px); }
        .stat-label{ font-family:'Space Mono',monospace; font-size:9.5px; letter-spacing:.1em; color:var(--ink-dim); text-transform:uppercase; margin-bottom:10px; }
        .stat-value{ font-size:24px; font-weight:600; }

        .section-title{ font-size:14.5px; font-weight:600; margin:0 0 14px; }
        .toolbar{ display:flex; gap:10px; margin-bottom:16px; }
        .adm-btn{ font-size:12px; padding:10px 16px; border-radius:10px; cursor:pointer; letter-spacing:.02em; border:none; }
        .adm-btn.solid{ background:var(--white); color:#0A0A0A; font-weight:600; }
        .adm-btn.line{ border:1px solid var(--line); color:var(--ink); background:var(--card); }
        .adm-btn.line:hover{ border-color:rgba(255,255,255,0.2); }

        .cards-list{ display:flex; flex-direction:column; gap:8px; }
        .row-card{ background:var(--card); border-radius:12px; padding:14px 18px; font-size:12.5px; color:var(--ink-dim); display:flex; justify-content:space-between; }
        .empty-card{ background:var(--card); border-radius:14px; padding:40px 20px; text-align:center; font-size:12.5px; color:var(--ink-dim); border:1px dashed var(--line); }

        .prod-list{ display:flex; flex-direction:column; gap:10px; }
        .prod-row{ background:var(--card); border-radius:14px; padding:14px 16px; display:flex; align-items:center; gap:16px; box-shadow:0 0 0 1px rgba(255,255,255,0.03); }
        .prod-thumb{
          position:relative; width:56px; height:56px; border-radius:10px; flex-shrink:0;
          background:radial-gradient(circle at 30% 20%, rgba(255,255,255,0.08), transparent 60%), #1c1c1f;
        }
        .badge-off{ position:absolute; top:-6px; right:-6px; background:rgba(74,222,128,0.15); color:#4ADE80; font-size:9px; font-weight:600; padding:2px 5px; border-radius:8px; border:1px solid rgba(74,222,128,0.3); }
        .prod-info{ flex:1; min-width:0; }
        .prod-tag{ font-family:'Space Mono',monospace; font-size:9px; letter-spacing:.08em; color:var(--ink-dim); text-transform:uppercase; }
        .prod-name{ font-size:14px; margin:2px 0; font-weight:600; }
        .prod-cat{ font-size:11px; color:var(--ink-dim); }
        .prod-price{ text-align:right; flex-shrink:0; }
        .prod-original{ display:block; font-size:11px; color:var(--ink-dim); text-decoration:line-through; }
        .prod-final{ font-size:15px; font-weight:600; }
        .prod-actions{ display:flex; gap:6px; flex-shrink:0; }
        .adm-btn.small{ padding:7px 12px; font-size:11.5px; }
        .adm-btn.danger{ color:#F08A72; border-color:rgba(240,138,114,0.25); }
        .adm-btn.danger:hover{ border-color:rgba(240,138,114,0.5); }

        .note{ font-size:12px; color:var(--ink-dim); font-style:italic; margin-top:6px; }
      `}</style>

      <div className="fx" />

      <aside className="sidebar">
        <div className="side-logo">
          <MonoMark />
          <div>
            <span className="side-word"><b>MARIMAX</b></span>
            <span className="side-tag">ADMIN</span>
          </div>
        </div>
        {NAV.map((n) => (
          <div key={n.key} className={`side-link ${active === n.key ? "active" : ""}`} onClick={() => setActive(n.key)}>
            <span className="ic">{n.icon}</span>{n.label}
          </div>
        ))}
        <Link to="/" className="side-back">← Ver site</Link>
      </aside>

      <main className="main">
        <div className="main-head">
          <h1 className="main-title">{NAV.find((n) => n.key === active)?.label}</h1>
          <span className="badge">NÍVEL: ADMIN</span>
        </div>

        {active === "dashboard" && (
          <>
            <div className="stats-grid">
              <StatCard label="Visitantes" value={STATS.visitantes} />
              <StatCard label="Visualizações" value={STATS.visualizacoes} />
              <StatCard label="Vendas" value={STATS.vendas} />
              <StatCard label="Faturamento" value={STATS.faturamento} money />
              <StatCard label="Conversão" value={STATS.conversao} />
              <StatCard label="Clientes novos" value={STATS.clientesNovos} />
              <StatCard label="Clientes recorrentes" value={STATS.clientesRecorrentes} />
            </div>
            <p className="note">Números zerados de propósito — ligue esta seção ao Firestore/Analytics para dados reais.</p>
          </>
        )}

        {active === "produtos" && (
          <>
            <div className="toolbar">
              <button className="adm-btn solid">+ Adicionar produto</button>
              <button className="adm-btn line">Importar</button>
            </div>
            <div className="prod-list">
              {PRODUCTS.map((p) => <ProductRow key={p.id} p={p} />)}
            </div>
            <p className="note">Esses são os mesmos produtos que aparecem no site público — editar aqui hoje é só visual; ligue ao Firestore para editar de verdade.</p>
          </>
        )}

        {active === "pedidos" && <EmptyCard text="Nenhum pedido ainda — conecte a coleção 'orders' do Firestore." />}
        {active === "clientes" && <EmptyCard text="Nenhum cliente ainda — conecte a coleção 'customers'." />}

        {active === "usuarios" && (
          <>
            <div className="toolbar"><button className="adm-btn solid">+ Novo usuário</button></div>
            <EmptyCard text="Nenhum usuário administrativo cadastrado." />
          </>
        )}
        {active === "banners" && (
          <>
            <div className="toolbar"><button className="adm-btn solid">+ Novo banner</button></div>
            <EmptyCard text="Nenhum banner cadastrado." />
          </>
        )}
        {active === "promocoes" && (
          <>
            <div className="toolbar"><button className="adm-btn solid">+ Novo cupom</button></div>
            <EmptyCard text="Nenhum cupom ativo." />
          </>
        )}
        {active === "noticias" && (
          <>
            <div className="toolbar"><button className="adm-btn solid">+ Nova publicação</button></div>
            <EmptyCard text="Nenhuma publicação ainda." />
          </>
        )}
        {active === "textos" && (
          <>
            <p className="section-title">Textos editáveis do site</p>
            <EmptyCard text="Ligue esta seção à coleção 'siteTexts' para editar os textos da Home direto por aqui." />
          </>
        )}
      </main>
    </div>
  );
}
