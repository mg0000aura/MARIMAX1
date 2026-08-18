import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PRODUCTS, CATEGORIES, currency } from "../data/products";
import { useAuth } from "../context/AuthContext.jsx";

function Bolt() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="currentColor" />
    </svg>
  );
}

export default function Produtos() {
  const [cat, setCat] = useState("Todos");
  const [q, setQ] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleBuyClick(e, productPath) {
    if (!user) {
      e.preventDefault();
      navigate("/conta", { state: { from: productPath, reason: "checkout" } });
    }
    // se já estiver logado, o Link normal leva pra página do produto
    // (troque por navigate direto pro checkout quando o checkout existir)
  }

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const okCat = cat === "Todos" || p.category === cat;
      const okQ = p.name.toLowerCase().includes(q.toLowerCase());
      return okCat && okQ;
    });
  }, [cat, q]);

  return (
    <div className="mx-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Space+Mono:wght@400;700&family=Work+Sans:wght@300;400;500;600&display=swap');
        :root{
          --navy:#08090F; --navy-2:#12131C; --card:#14151F;
          --gold:#C89B5C; --gold-soft:#E3BE86; --bone:#F3EFE6;
          --line:rgba(243,239,230,0.08); --ok:#4ADE80;
        }
        .mx-root{ position:relative; background:var(--navy); color:var(--bone); font-family:'Work Sans',sans-serif; min-height:100vh; overflow-x:hidden; }
        .mx-root *{ box-sizing:border-box; }
        .mx-root a{ color:inherit; text-decoration:none; }

        /* --- fundo com brilho, sem grade pesada --- */
        .fx{ position:fixed; inset:0; z-index:0; pointer-events:none; }
        .fx::before{
          content:''; position:absolute; top:-10%; left:10%; width:60vw; height:60vw;
          background:radial-gradient(circle, rgba(200,155,92,0.16), transparent 60%);
          filter:blur(40px);
        }
        .fx::after{
          content:''; position:absolute; bottom:-20%; right:5%; width:50vw; height:50vw;
          background:radial-gradient(circle, rgba(200,155,92,0.10), transparent 65%);
          filter:blur(40px);
        }

        .topbar{ position:relative; z-index:1; padding:20px 6vw; display:flex; justify-content:space-between; align-items:center; backdrop-filter:blur(6px); }
        .brand{ font-family:'Fraunces',serif; letter-spacing:.1em; font-size:14px; }
        .back{ font-size:12.5px; color:rgba(243,239,230,0.5); }
        .back:hover{ color:var(--gold-soft); }

        .wrap{ position:relative; z-index:1; padding: 20px 6vw 100px; max-width:1240px; margin:0 auto; }
        .head{ margin-bottom:30px; }
        .title{ font-family:'Fraunces',serif; font-weight:500; font-size:clamp(1.9rem,4vw,2.6rem); margin:6px 0 0; }
        .eyebrow{ font-family:'Space Mono',monospace; font-size:11px; letter-spacing:0.16em; color:var(--gold-soft); text-transform:uppercase; }

        .toolbar{ display:flex; justify-content:space-between; align-items:center; gap:16px; flex-wrap:wrap; margin-bottom:34px; }
        .cats{ display:flex; gap:8px; flex-wrap:wrap; }
        .cat-btn{ font-size:12.5px; padding:8px 15px; border:1px solid transparent; border-radius:20px; cursor:pointer; background:var(--navy-2); color:rgba(243,239,230,0.6); transition:all .2s; }
        .cat-btn.active{ background:rgba(200,155,92,0.14); color:var(--gold-soft); border-color:rgba(200,155,92,0.3); }
        .search input{
          background:var(--navy-2); border:1px solid var(--line); color:var(--bone);
          padding:10px 16px; font-size:13px; border-radius:20px; width:220px; outline:none;
        }
        .search input:focus{ border-color:rgba(200,155,92,0.4); }

        .grid{ display:grid; grid-template-columns:repeat(auto-fill, minmax(230px,1fr)); gap:20px; }
        .card{
          background:var(--card); border-radius:14px; overflow:hidden; display:flex; flex-direction:column;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.03);
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .card:hover{ transform:translateY(-3px); box-shadow: 0 12px 28px rgba(0,0,0,0.4), 0 0 0 1px rgba(200,155,92,0.25); }
        .card-img{
          aspect-ratio:4/5; position:relative;
          background:
            radial-gradient(circle at 30% 20%, rgba(200,155,92,0.22), transparent 55%),
            linear-gradient(160deg, #1a1b28, #0d0e15);
          display:flex; align-items:center; justify-content:center;
          font-family:'Space Mono',monospace; font-size:10px; color:rgba(243,239,230,0.25); letter-spacing:.1em;
        }
        .badge-off{
          position:absolute; top:10px; right:10px; background:rgba(74,222,128,0.15); color:var(--ok);
          font-size:11px; font-weight:600; padding:3px 8px; border-radius:20px; border:1px solid rgba(74,222,128,0.3);
        }
        .card-body{ padding:16px; display:flex; flex-direction:column; gap:6px; flex:1; }
        .card-tag{ font-family:'Space Mono',monospace; font-size:10px; letter-spacing:.1em; color:var(--gold-soft); text-transform:uppercase; opacity:0.85; }
        .card-name{ font-family:'Fraunces',serif; font-size:16px; margin:0; }
        .card-benefits{ list-style:none; padding:0; margin:2px 0 4px; display:flex; flex-direction:column; gap:2px; }
        .card-benefits li{ font-size:11.5px; color:rgba(243,239,230,0.45); }
        .card-benefits li::before{ content:'✓ '; color:var(--gold-soft); }

        .price-row{ margin-top:auto; padding-top:6px; }
        .card-original{ font-size:12px; color:rgba(243,239,230,0.35); text-decoration:line-through; margin-right:6px; }
        .card-price{ font-family:'Fraunces',serif; font-size:20px; }
        .pix{ display:flex; align-items:center; gap:4px; font-size:10.5px; color:rgba(243,239,230,0.4); margin-top:2px; }
        .pix svg{ color:var(--gold-soft); }
        .from-note{ font-size:10.5px; color:rgba(243,239,230,0.35); }

        .card-ctas{ display:flex; gap:8px; margin-top:12px; }
        .btn{ text-align:center; font-size:12.5px; padding:10px; border-radius:9px; cursor:pointer; letter-spacing:.02em; border:none; }
        .btn-solid{ flex:1; background:var(--bone); color:#0A0A0A; font-weight:600; }
        .btn-solid:hover{ background:var(--gold-soft); }
        .btn-icon{ width:40px; display:flex; align-items:center; justify-content:center; background:var(--navy-2); color:var(--bone); border:1px solid var(--line); }
        .btn-icon:hover{ border-color:rgba(200,155,92,0.4); }

        .empty{ padding:60px 0; text-align:center; color:rgba(243,239,230,0.35); font-size:14px; }
      `}</style>

      <div className="fx" />

      <div className="topbar">
        <Link to="/" className="brand">MARIMAX</Link>
        <Link to="/" className="back">← Voltar para a Home</Link>
      </div>

      <div className="wrap">
        <div className="head">
          <div className="eyebrow">MARIMAX · CATÁLOGO</div>
          <h1 className="title">Produtos & Serviços</h1>
        </div>

        <div className="toolbar">
          <div className="cats">
            {CATEGORIES.map((c) => (
              <button key={c} className={`cat-btn ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>
          <div className="search">
            <input placeholder="Buscar produto..." value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty">Nada por aqui ainda. Ajuste a busca ou o filtro.</div>
        ) : (
          <div className="grid">
            {filtered.map((p) => {
              const first = p.variants[0];
              const lowest = p.variants.reduce((min, v) => (v.price < min ? v.price : min), first.price);
              const withOriginal = p.variants.find((v) => v.original);
              const off = withOriginal ? Math.round((1 - withOriginal.price / withOriginal.original) * 100) : null;

              return (
                <div className="card" key={p.id}>
                  <Link to={`/produtos/${p.id}`}>
                    <div className="card-img">
                      SEM IMAGEM
                      {off && <span className="badge-off">↓ {off}%</span>}
                    </div>
                  </Link>
                  <div className="card-body">
                    <span className="card-tag">{p.tag}</span>
                    <Link to={`/produtos/${p.id}`}>
                      <h3 className="card-name">{p.name}</h3>
                    </Link>
                    <ul className="card-benefits">
                      {p.benefits.slice(0, 2).map((b) => <li key={b}>{b}</li>)}
                    </ul>
                    <div className="price-row">
                      {withOriginal && <span className="card-original">{currency(withOriginal.original)}</span>}
                      <span className="card-price">{currency(lowest)}</span>
                      <div className="pix"><Bolt /> À vista no PIX</div>
                      {p.variants.length > 1 && <div className="from-note">a partir de · {p.variants.length} opções</div>}
                    </div>
                    <div className="card-ctas">
                      <Link
                        to={`/produtos/${p.id}`}
                        className="btn btn-solid"
                        onClick={(e) => handleBuyClick(e, `/produtos/${p.id}`)}
                      >
                        Comprar
                      </Link>
                      <Link to={`/produtos/${p.id}`} className="btn btn-icon">→</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
