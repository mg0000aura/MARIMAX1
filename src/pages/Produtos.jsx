import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS, CATEGORIES, currency } from "../data/products";

export default function Produtos() {
  const [cat, setCat] = useState("Todos");
  const [q, setQ] = useState("");

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
        :root{ --navy:#0B0E1A; --navy-2:#12172B; --gold:#B08A4E; --gold-soft:#C9A96E; --bone:#F3EFE6; --line:rgba(243,239,230,0.14); }
        .mx-root{ background:var(--navy); color:var(--bone); font-family:'Work Sans',sans-serif; min-height:100vh; }
        .mx-root *{ box-sizing:border-box; }
        .mx-root a{ color:inherit; text-decoration:none; }
        .topbar{ padding:20px 6vw; border-bottom:1px solid var(--line); display:flex; justify-content:space-between; align-items:center; }
        .brand{ font-family:'Fraunces',serif; letter-spacing:.1em; font-size:14px; }
        .back{ font-size:12.5px; color:rgba(243,239,230,0.6); }
        .back:hover{ color:var(--gold-soft); }
        .wrap{ padding: 48px 6vw 100px; }
        .head{ display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:20px; margin-bottom:36px; }
        .title{ font-family:'Fraunces',serif; font-weight:500; font-size:clamp(1.9rem,4vw,2.6rem); margin:0; }
        .eyebrow{ font-family:'Space Mono',monospace; font-size:11px; letter-spacing:0.16em; color:var(--gold-soft); text-transform:uppercase; }

        .toolbar{ display:flex; justify-content:space-between; align-items:center; gap:20px; flex-wrap:wrap; margin-bottom:32px; padding-bottom:20px; border-bottom:1px solid var(--line); }
        .cats{ display:flex; gap:10px; flex-wrap:wrap; }
        .cat-btn{ font-size:12.5px; padding:8px 14px; border:1px solid var(--line); border-radius:2px; cursor:pointer; background:transparent; color:rgba(243,239,230,0.7); }
        .cat-btn.active{ border-color:var(--gold); color:var(--gold-soft); }
        .search input{
          background:var(--navy-2); border:1px solid var(--line); color:var(--bone);
          padding:10px 14px; font-size:13px; border-radius:2px; width:240px; outline:none;
        }
        .search input:focus{ border-color:var(--gold-soft); }

        .grid{ display:grid; grid-template-columns:repeat(auto-fill, minmax(240px,1fr)); gap:24px; }
        .card{ background:var(--navy-2); border:1px solid var(--line); border-radius:2px; overflow:hidden; display:flex; flex-direction:column; transition:border-color .2s; }
        .card:hover{ border-color:var(--gold-soft); }
        .card-img{ aspect-ratio:4/5; background:linear-gradient(135deg, rgba(176,138,78,0.14), rgba(243,239,230,0.03)); display:flex; align-items:center; justify-content:center; font-family:'Space Mono',monospace; font-size:11px; color:rgba(243,239,230,0.3); letter-spacing:.1em; }
        .card-body{ padding:18px; display:flex; flex-direction:column; gap:8px; flex:1; }
        .card-tag{ font-family:'Space Mono',monospace; font-size:10px; letter-spacing:.1em; color:var(--gold-soft); text-transform:uppercase; }
        .card-name{ font-family:'Fraunces',serif; font-size:17px; margin:0; }
        .card-benefits{ list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:3px; }
        .card-benefits li{ font-size:12px; color:rgba(243,239,230,0.55); }
        .card-benefits li::before{ content:'— '; color:var(--gold-soft); }
        .card-price{ font-family:'Fraunces',serif; font-size:19px; margin-top:auto; padding-top:8px; }
        .card-price small{ font-size:11px; color:rgba(243,239,230,0.45); font-family:'Work Sans',sans-serif; display:block; }
        .card-original{ font-size:12px; color:rgba(243,239,230,0.4); text-decoration:line-through; margin-right:6px; }
        .card-ctas{ display:flex; gap:8px; margin-top:10px; }
        .btn{ flex:1; text-align:center; font-size:12px; padding:10px; border-radius:2px; cursor:pointer; letter-spacing:.03em; border:none; }
        .btn-solid{ background:var(--gold); color:var(--navy); font-weight:600; border:1px solid var(--gold); }
        .btn-solid:hover{ background:var(--gold-soft); }
        .btn-line{ border:1px solid var(--line); color:var(--bone); background:transparent; }
        .btn-line:hover{ border-color:var(--gold-soft); color:var(--gold-soft); }

        .empty{ padding:60px 0; text-align:center; color:rgba(243,239,230,0.4); font-size:14px; }
      `}</style>

      <div className="topbar">
        <Link to="/" className="brand">MARIMAX</Link>
        <Link to="/" className="back">← Voltar para a Home</Link>
      </div>

      <div className="wrap">
        <div className="head">
          <div>
            <div className="eyebrow">MARIMAX · CATÁLOGO</div>
            <h1 className="title">Produtos & Serviços</h1>
          </div>
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
              return (
                <div className="card" key={p.id}>
                  <Link to={`/produtos/${p.id}`}>
                    <div className="card-img">SEM IMAGEM</div>
                  </Link>
                  <div className="card-body">
                    <span className="card-tag">{p.tag}</span>
                    <Link to={`/produtos/${p.id}`}>
                      <h3 className="card-name">{p.name}</h3>
                    </Link>
                    <ul className="card-benefits">
                      {p.benefits.map((b) => <li key={b}>{b}</li>)}
                    </ul>
                    <div className="card-price">
                      {first.original && <span className="card-original">{currency(first.original)}</span>}
                      {currency(lowest)}
                      <small>{p.variants.length > 1 ? "a partir de, veja as opções" : first.label}</small>
                    </div>
                    <div className="card-ctas">
                      <Link to={`/produtos/${p.id}`} className="btn btn-solid" style={{ display: "block" }}>Ver produto</Link>
                      <button className="btn btn-line">Orçamento</button>
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
