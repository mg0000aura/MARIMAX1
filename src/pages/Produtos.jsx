import React, { useMemo, useState } from "react";

/**
 * MARIMAX — Produtos / Serviços
 * -----------------------------------------------------------------------
 * PRODUCTS abaixo é só dado de exemplo. Troque pelos produtos reais
 * (ou ligue num fetch ao Firestore — ver /marimax-firebase.js).
 */
const CATEGORIES = ["Todos", "Streetwear", "Sneakers", "Acessórios", "Consultoria"];

const PRODUCTS = [
  { id: "p1", name: "Jaqueta Alfaiate 01", category: "Streetwear", price: 890, img: "", tag: "Lote 01/40", benefits: ["Corte sob medida", "Tecido nacional premium"] },
  { id: "p2", name: "Sneaker Edição Limitada", category: "Sneakers", price: 1240, img: "", tag: "Lote 12/60", benefits: ["Numerado", "Couro legítimo"] },
  { id: "p3", name: "Cinto Couro/Metal", category: "Acessórios", price: 340, img: "", tag: "Feito à mão", benefits: ["Fivela em latão", "Acabamento artesanal"] },
  { id: "p4", name: "Consultoria de Estilo", category: "Consultoria", price: 0, img: "", tag: "Sob orçamento", benefits: ["Curadoria personalizada", "Atendimento 1:1"] },
];

function currency(v) {
  if (!v) return "Sob consulta";
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

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
        .wrap{ padding: 48px 6vw 100px; }
        .head{ display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:20px; margin-bottom:36px; }
        .title{ font-family:'Fraunces',serif; font-weight:500; font-size:clamp(1.9rem,4vw,2.6rem); margin:0; }
        .eyebrow{ font-family:'Space Mono',monospace; font-size:11px; letter-spacing:0.16em; color:var(--gold-soft); text-transform:uppercase; }

        .toolbar{ display:flex; justify-content:space-between; align-items:center; gap:20px; flex-wrap:wrap; margin-bottom:32px; padding-bottom:20px; border-bottom:1px solid var(--line); }
        .cats{ display:flex; gap:10px; flex-wrap:wrap; }
        .cat-btn{ font-size:12.5px; padding:8px 14px; border:1px solid var(--line); border-radius:2px; cursor:pointer; background:transparent; color:rgba(243,239,230,0.7); }
        .cat-btn.active{ border-color:var(--gold); color:var(--gold-soft); }
        .search{ position:relative; }
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
        .card-ctas{ display:flex; gap:8px; margin-top:10px; }
        .btn{ flex:1; text-align:center; font-size:12px; padding:10px; border-radius:2px; cursor:pointer; letter-spacing:.03em; }
        .btn-solid{ background:var(--gold); color:var(--navy); font-weight:600; border:1px solid var(--gold); }
        .btn-solid:hover{ background:var(--gold-soft); }
        .btn-line{ border:1px solid var(--line); color:var(--bone); }
        .btn-line:hover{ border-color:var(--gold-soft); color:var(--gold-soft); }

        .empty{ padding:60px 0; text-align:center; color:rgba(243,239,230,0.4); font-size:14px; }
      `}</style>

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
            {filtered.map((p) => (
              <div className="card" key={p.id}>
                <div className="card-img">SEM IMAGEM</div>
                <div className="card-body">
                  <span className="card-tag">{p.tag}</span>
                  <h3 className="card-name">{p.name}</h3>
                  <ul className="card-benefits">
                    {p.benefits.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                  <div className="card-price">{currency(p.price)}</div>
                  <div className="card-ctas">
                    <button className="btn btn-solid">Comprar</button>
                    <button className="btn btn-line">Orçamento</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
