import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById, currency } from "../data/products";

function Stars({ n }) {
  return <span style={{ color: "#C9A96E", fontSize: 13 }}>{"★".repeat(n)}{"☆".repeat(5 - n)}</span>;
}

export default function ProdutoDetalhe() {
  const { id } = useParams();
  const product = getProductById(id);
  const [openFaq, setOpenFaq] = useState(null);
  const [variantIdx, setVariantIdx] = useState(0);

  if (!product) {
    return (
      <div style={{ background: "#0B0E1A", color: "#F3EFE6", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", gap: 16 }}>
        <p>Produto não encontrado.</p>
        <Link to="/produtos" style={{ color: "#C9A96E" }}>← Voltar para o catálogo</Link>
      </div>
    );
  }

  const variant = product.variants[variantIdx];

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

        .wrap{ padding: 48px 6vw 100px; max-width:1200px; margin:0 auto; }
        .top{ display:grid; grid-template-columns: 1fr 1fr; gap:56px; margin-bottom:70px; }
        @media (max-width:820px){ .top{ grid-template-columns:1fr; gap:32px; } }

        .gallery-main{ aspect-ratio:4/5; background:linear-gradient(135deg, rgba(176,138,78,0.14), rgba(243,239,230,0.03)); border:1px solid var(--line); display:flex; align-items:center; justify-content:center; font-family:'Space Mono',monospace; font-size:11px; color:rgba(243,239,230,0.3); letter-spacing:.1em; margin-bottom:10px; }

        .tag{ font-family:'Space Mono',monospace; font-size:11px; letter-spacing:.14em; color:var(--gold-soft); text-transform:uppercase; }
        .name{ font-family:'Fraunces',serif; font-weight:500; font-size:clamp(1.8rem,3.6vw,2.4rem); margin:10px 0 14px; }

        .variants{ display:flex; gap:8px; flex-wrap:wrap; margin-bottom:18px; }
        .variant-btn{ font-size:12.5px; padding:9px 14px; border:1px solid var(--line); border-radius:2px; cursor:pointer; background:transparent; color:rgba(243,239,230,0.7); }
        .variant-btn.active{ border-color:var(--gold); color:var(--gold-soft); }

        .price{ font-family:'Fraunces',serif; font-size:26px; margin-bottom:20px; }
        .price .original{ font-size:15px; color:rgba(243,239,230,0.4); text-decoration:line-through; margin-right:8px; }
        .desc{ font-size:14.5px; line-height:1.8; color:rgba(243,239,230,0.72); margin-bottom:26px; }

        .block{ margin-bottom:22px; }
        .block-title{ font-family:'Space Mono',monospace; font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:rgba(243,239,230,0.5); margin-bottom:10px; }
        .block ul{ list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:6px; }
        .block li{ font-size:13.5px; color:rgba(243,239,230,0.75); }
        .block li::before{ content:'— '; color:var(--gold-soft); }

        .ctas{ display:flex; gap:12px; margin-top:28px; }
        .btn{ flex:1; text-align:center; font-size:13px; padding:14px; border-radius:2px; cursor:pointer; letter-spacing:.03em; border:none; }
        .btn-solid{ background:var(--gold); color:var(--navy); font-weight:600; border:1px solid var(--gold); }
        .btn-solid:hover{ background:var(--gold-soft); }
        .btn-line{ border:1px solid var(--line); color:var(--bone); background:transparent; }
        .btn-line:hover{ border-color:var(--gold-soft); color:var(--gold-soft); }

        section.info{ padding:36px 0; border-top:1px solid var(--line); }
        .info-title{ font-family:'Fraunces',serif; font-size:20px; margin:0 0 18px; }

        .faq-item{ border-bottom:1px solid var(--line); padding:16px 0; cursor:pointer; }
        .faq-q{ display:flex; justify-content:space-between; font-size:14.5px; }
        .faq-a{ font-size:13.5px; color:rgba(243,239,230,0.65); margin-top:10px; line-height:1.6; }

        .review{ padding:16px 0; border-bottom:1px solid var(--line); }
        .review-head{ display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; }
        .review-name{ font-size:13px; color:var(--gold-soft); }
        .review-comment{ font-size:13.5px; color:rgba(243,239,230,0.75); }
        .no-reviews{ font-size:13.5px; color:rgba(243,239,230,0.45); font-style:italic; }
      `}</style>

      <div className="topbar">
        <Link to="/" className="brand">MARIMAX</Link>
        <Link to="/produtos" className="back">← Voltar para o catálogo</Link>
      </div>

      <div className="wrap">
        <div className="top">
          <div>
            <div className="gallery-main">SEM IMAGEM</div>
          </div>

          <div>
            <span className="tag">{product.tag}</span>
            <h1 className="name">{product.name}</h1>

            {product.variants.length > 1 && (
              <div className="variants">
                {product.variants.map((v, i) => (
                  <button
                    key={v.label + v.price}
                    className={`variant-btn ${i === variantIdx ? "active" : ""}`}
                    onClick={() => setVariantIdx(i)}
                  >
                    {v.label} — {currency(v.price)}
                  </button>
                ))}
              </div>
            )}

            <div className="price">
              {variant.original && <span className="original">{currency(variant.original)}</span>}
              {currency(variant.price)}
            </div>
            <p className="desc">{product.desc}</p>

            <div className="block">
              <div className="block-title">O que está incluído</div>
              <ul>{product.includes.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
            <div className="block">
              <div className="block-title">Benefícios</div>
              <ul>{product.benefits.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
            <div className="block">
              <div className="block-title">Para quem é</div>
              <p style={{ fontSize: 13.5, color: "rgba(243,239,230,0.72)" }}>{product.forWhom}</p>
            </div>

            <div className="ctas">
              <button className="btn btn-solid">Comprar agora</button>
              <button className="btn btn-line">Solicitar orçamento</button>
            </div>
          </div>
        </div>

        <section className="info">
          <h2 className="info-title">Como funciona</h2>
          <p style={{ fontSize: 14, color: "rgba(243,239,230,0.7)", lineHeight: 1.7 }}>{product.howItWorks}</p>
        </section>

        <section className="info">
          <h2 className="info-title">Perguntas frequentes</h2>
          {product.faq.map((f, i) => (
            <div className="faq-item" key={f.q} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="faq-q">
                <span>{f.q}</span>
                <span style={{ color: "#C9A96E" }}>{openFaq === i ? "–" : "+"}</span>
              </div>
              {openFaq === i && <div className="faq-a">{f.a}</div>}
            </div>
          ))}
        </section>

        <section className="info">
          <h2 className="info-title">Avaliações</h2>
          {product.reviews.length === 0 ? (
            <p className="no-reviews">Ainda sem avaliações — sejam as primeiras a comprar.</p>
          ) : (
            product.reviews.map((r) => (
              <div className="review" key={r.name + r.comment}>
                <div className="review-head">
                  <span className="review-name">{r.name}</span>
                  <Stars n={r.rating} />
                </div>
                <div className="review-comment">{r.comment}</div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
