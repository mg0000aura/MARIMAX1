import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 * MARIMAX ADM — Painel Administrativo
 * -----------------------------------------------------------------------
 * Identidade visual separada do site público, como pedido: preto e
 * branco, mais seco e funcional — não é "a mesma marca com cor trocada".
 * Marca aqui vira só monograma (M dentro do losango) em vez da wordmark
 * completa, reforçando que é um ambiente interno.
 *
 * SEÇÕES abaixo são placeholders de dado — ligue cada uma ao Firestore
 * (coleções sugeridas: products, orders, customers, users, banners,
 * coupons, news, pages, stats).
 */
const NAV = [
  { key: "dashboard", label: "Estatísticas" },
  { key: "produtos", label: "Produtos" },
  { key: "pedidos", label: "Pedidos" },
  { key: "clientes", label: "Clientes" },
  { key: "usuarios", label: "Usuários" },
  { key: "banners", label: "Banners" },
  { key: "promocoes", label: "Promoções / Cupons" },
  { key: "noticias", label: "Novidades / Blog" },
  { key: "textos", label: "Textos do site" },
];

const STATS = {
  visitantes: 0, visualizacoes: 0, vendas: 0, faturamento: 0,
  conversao: 0, clientesNovos: 0, clientesRecorrentes: 0,
};

function MonoMark({ dark }) {
  const stroke = dark ? "#F5F5F5" : "#0A0A0A";
  return (
    <svg viewBox="0 0 220 220" width="26" height="26" fill="none">
      <polygon points="110,14 206,110 110,206 14,110" stroke={stroke} strokeWidth="3" />
      <path d="M70 66 L110 132 L150 66 M78 66 L78 154 M142 66 L142 154" stroke={stroke} strokeWidth="3" strokeLinecap="square" />
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

function TablePlaceholder({ cols }) {
  return (
    <div className="table-shell">
      <div className="table-row table-head">
        {cols.map((c) => <div key={c} className="table-cell">{c}</div>)}
      </div>
      <div className="table-empty">Nenhum registro ainda — conecte a coleção correspondente.</div>
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
          --bg:#0A0A0A; --panel:#141414; --line:#262626;
          --ink:#F5F5F5; --ink-dim:#9A9A9A; --white:#FFFFFF;
        }
        .mx-adm{ background:var(--bg); color:var(--ink); font-family:'Space Grotesk', sans-serif; min-height:100vh; display:flex; }
        .mx-adm *{ box-sizing:border-box; }

        .sidebar{ width:230px; flex-shrink:0; background:var(--panel); border-right:1px solid var(--line); padding:24px 0; display:flex; flex-direction:column; }
        .side-logo{ display:flex; align-items:center; gap:10px; padding:0 22px 24px; border-bottom:1px solid var(--line); margin-bottom:14px; }
        .side-word{ font-size:13px; letter-spacing:.14em; }
        .side-word b{ font-weight:600; }
        .side-tag{ font-family:'Space Mono',monospace; font-size:9px; letter-spacing:.12em; color:var(--ink-dim); display:block; }
        .mx-adm a{ color:inherit; text-decoration:none; }
        .side-back{ padding:12px 22px 0; font-size:11.5px; color:var(--ink-dim); margin-top:auto; }
        .side-back:hover{ color:var(--ink); }

        .side-link{ padding:11px 22px; font-size:13px; color:var(--ink-dim); cursor:pointer; border-left:2px solid transparent; }
        .side-link:hover{ color:var(--ink); }
        .side-link.active{ color:var(--white); border-left-color:var(--white); background:rgba(255,255,255,0.04); }

        .main{ flex:1; padding:32px 40px; overflow-x:auto; }
        .main-head{ display:flex; justify-content:space-between; align-items:center; margin-bottom:28px; }
        .main-title{ font-size:22px; font-weight:600; margin:0; }
        .badge{ font-family:'Space Mono',monospace; font-size:10px; letter-spacing:.1em; color:var(--ink-dim); border:1px solid var(--line); padding:5px 10px; border-radius:2px; }

        .stats-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:1px; background:var(--line); border:1px solid var(--line); margin-bottom:36px; }
        .stat-card{ background:var(--panel); padding:22px; }
        .stat-label{ font-family:'Space Mono',monospace; font-size:10px; letter-spacing:.1em; color:var(--ink-dim); text-transform:uppercase; margin-bottom:10px; }
        .stat-value{ font-size:26px; font-weight:600; }

        .section-title{ font-size:15px; font-weight:600; margin:0 0 14px; }
        .table-shell{ border:1px solid var(--line); border-radius:2px; overflow:hidden; margin-bottom:36px; }
        .table-row{ display:grid; grid-template-columns:repeat(var(--n,4), 1fr); }
        .table-head{ background:var(--panel); }
        .table-cell{ padding:12px 16px; font-size:11px; letter-spacing:.06em; text-transform:uppercase; color:var(--ink-dim); border-right:1px solid var(--line); }
        .table-cell:last-child{ border-right:none; }
        .table-empty{ padding:26px 16px; font-size:12.5px; color:var(--ink-dim); text-align:center; background:#0D0D0D; }

        .toolbar{ display:flex; gap:10px; margin-bottom:18px; }
        .adm-btn{ font-size:12px; padding:9px 16px; border-radius:2px; cursor:pointer; letter-spacing:.03em; }
        .adm-btn.solid{ background:var(--white); color:var(--bg); border:1px solid var(--white); font-weight:600; }
        .adm-btn.line{ border:1px solid var(--line); color:var(--ink); background:transparent; }
        .adm-btn.line:hover{ border-color:var(--ink-dim); }

        .note{ font-size:12px; color:var(--ink-dim); font-style:italic; }
      `}</style>

      <aside className="sidebar">
        <div className="side-logo">
          <MonoMark dark />
          <div>
            <span className="side-word"><b>MARIMAX</b></span>
            <span className="side-tag">ADMIN</span>
          </div>
        </div>
        {NAV.map((n) => (
          <div key={n.key} className={`side-link ${active === n.key ? "active" : ""}`} onClick={() => setActive(n.key)}>
            {n.label}
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
            <TablePlaceholder cols={["Produto", "Categoria", "Preço", "Estoque"]} />
          </>
        )}

        {active === "pedidos" && (
          <>
            <TablePlaceholder cols={["Pedido", "Cliente", "Status", "Total"]} />
          </>
        )}

        {active === "clientes" && <TablePlaceholder cols={["Cliente", "E-mail", "Pedidos", "Desde"]} />}
        {active === "usuarios" && (
          <>
            <div className="toolbar">
              <button className="adm-btn solid">+ Novo usuário</button>
            </div>
            <TablePlaceholder cols={["Usuário", "Nível de acesso", "Status"]} />
          </>
        )}
        {active === "banners" && (
          <>
            <div className="toolbar"><button className="adm-btn solid">+ Novo banner</button></div>
            <TablePlaceholder cols={["Banner", "Posição", "Ativo"]} />
          </>
        )}
        {active === "promocoes" && (
          <>
            <div className="toolbar"><button className="adm-btn solid">+ Novo cupom</button></div>
            <TablePlaceholder cols={["Cupom", "Desconto", "Validade", "Usos"]} />
          </>
        )}
        {active === "noticias" && (
          <>
            <div className="toolbar"><button className="adm-btn solid">+ Nova publicação</button></div>
            <TablePlaceholder cols={["Título", "Categoria", "Status", "Data"]} />
          </>
        )}
        {active === "textos" && (
          <>
            <p className="section-title">Textos editáveis do site</p>
            <TablePlaceholder cols={["Bloco", "Página", "Última edição"]} />
          </>
        )}
      </main>
    </div>
  );
}
