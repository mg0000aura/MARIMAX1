import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getProductById, currency } from "../data/products";
import { useAuth } from "../context/AuthContext.jsx";

function Bolt() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="currentColor" />
    </svg>
  );
}

function Stars({ n }) {
  return <span style={{ color: "#E3BE86", fontSize: 13 }}>{"★".repeat(n)}{"☆".repeat(5 - n)}</span>;
}

export default function ProdutoDetalhe() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const product = getProductById(id);
  const [openFaq, setOpenFaq] = useState(null);
  const [variantIdx, setVariantIdx] = useState(0);

  if (!product) {
    return (
      <div style={{ background: "#08090F", color: "#F3EFE6", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", gap: 16 }}>
        <p>Produto não encontrado.</p>
        <Link to="/produtos" style={{ color: "#E3BE86" }}>← Voltar para o catálogo</Link>
      </div>
    );
  }

  const variant = product.variants[variantIdx];
  const off = variant.original ? Math.round((1 - variant.price / variant.original) * 100) : null;

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

        .fx{ position:fixed; inset:0; z-index:0; pointer-events:none; }
        .fx::before{ content:''; position:absolute; top:-10%; right:5%; width:55vw; height:55vw; background:radial-gradient(circle, rgba(200,155,92,0.14), transparent 60%); filter:blur(40px); }
        .fx::after{ content:''; position:absolute; bottom:0; left:-10%; width:45vw; height:45vw; background:radial-gradient(circle, rgba(200,155,92,0.08), transparent 65%); filter:blur(40px); }

        .topbar{ position:relative; z-index:1; padding:20px 6vw; display:flex; justify-content:space-between; align-items:center; }
        .brand{ font-family:'Fraunces',serif; letter-spacing:.1em; font-size:14px; }
        .back{ font-size:12.5px; color:rgba(243,239,230,0.5); }
        .back:hover{ color:var(--gold-soft); }

        .wrap{ position:relative; z-index:1; padding: 30px 6vw 100px; max-width:1160px; margin:0 auto; }
        .top{ display:grid; grid-template-columns: 1fr 1fr; gap:48px; margin-bottom:64px; }
        @media (max-width:820px){ .top{ grid-template-columns:1fr; gap:28px; } }

        .gallery-main{
          aspect-ratio:4/5; border-radius:16px; position:relative;
          background:
            radial-gradient(circle at 30% 20%, rgba(200,155,92,0.22), transparent 55%),
            linear-gradient(160deg, #1a1b28, #0d0e15);
          display:flex; align-items:center; justify-content:center;
          font-family:'Space Mono',monospace; font-size:11px; color:rgba(243,239,230,0.25); letter-spacing:.1em;
        }
        .badge-off{ position:absolute; top:14px; right:14px; background:rgba(74,222,128,0.15); color:var(--ok); font-size:12px; font-weight:600; padding:4px 10px; border-radius:20px; border:1px solid rgba(74,222,128,0.3); }

        .tag{ font-family:'Space Mono',monospace; font-size:11px; letter-spacing:.14em; color:var(--gold-soft); text-transform:uppercase; }
        .name{ font-family:'Fraunces',serif; font-weight:500; font-size:clamp(1.7rem,3.4vw,2.3rem); margin:8px 0 16px; }

        .variants{ display:flex; gap:8px; flex-wrap:wrap; margin-bottom:18px; }
        .variant-btn{ font-size:12.5px; padding:9px 14px; border:1px solid var(--line); border-radius:20px; cursor:pointer; background:var(--card); color:rgba(243,239,230,0.6); transition:all .2s; }
        .variant-btn.active{ background:rgba(200,155,92,0.14); border-color:rgba(200,155,92,0.35); color:var(--gold-soft); }

        .price-block{ background:var(--card); border-radius:14px; padding:18px 20px; margin-bottom:22px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; }
        .price-left .original{ font-size:13px; color:rgba(243,239,230,0.35); text-decoration:line-through; }
        .price-left .price{ font-family:'Fraunces',serif; font-size:26px; }
        .pix{ display:flex; align-items:center; gap:5px; font-size:11.5px; color:rgba(243,239,230,0.45); margin-top:3px; }
        .pix svg{ color:var(--gold-soft); }

        .desc{ font-size:14.5px; line-height:1.8; color:rgba(243,239,230,0.65); margin-bottom:24px; }

        .block{ margin-bottom:20px; }
        .block-title{ font-family:'Space Mono',monospace; font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:rgba(243,239,230,0.45); margin-bottom:10px; }
        .block ul{ list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:6px; }
        .block li{ font-size:13.5px; color:rgba(243,239,230,0.7); }
        .block li::before{ content:'✓ '; color:var(--gold-soft); }

        .ctas{ display:flex; gap:10px; margin-top:26px; }
        .btn{ text-align:center; font-size:13px; padding:14px; border-radius:12px; cursor:pointer; letter-spacing:.02em; border:none; }
        .btn-solid{ flex:1; background:var(--bone); color:#0A0A0A; font-weight:600; }
        .btn-solid:hover{ background:var(--gold-soft); }
        .btn-line{ flex:1; border:1px solid var(--line); color:var(--bone); background:transparent; }
        .btn-line:hover{ border-color:rgba(200,155,92,0.4); color:var(--gold-soft); }

        section.info{ position:relative; z-index:1; padding:34px 0; border-top:1px solid var(--line); }
        .info-title{ font-family:'Fraunces',serif; font-size:19px; margin:0 0 16px; }

        .faq-item{ border-bottom:1px solid var(--line); padding:15px 0; cursor:pointer; }
        .faq-q{ display:flex; justify-content:space-between; font-size:14px; }
        .faq-a{ font-size:13.5px; color:rgba(243,239,230,0.6); margin-top:10px; line-height:1.6; }

        .review{ padding:14px 0; border-bottom:1px solid var(--line); }
        .review-head{ display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; }
        .review-name{ font-size:13px; color:var(--gold-soft); }
        .review-comment{ font-size:13.5px; color:rgba(243,239,230,0.7); }
        .no-reviews{ font-size:13.5px; color:rgba(243,239,230,0.4); font-style:italic; }
      `}</style>

      <div className="fx" />

      <div className="topbar">
        <Link to="/" className="brand">MARIMAX</Link>
        <Link to="/produtos" className="back">← Voltar para o catálogo</Link>
      </div>

      <div className="wrap">
        <div className="top">
          <div>
            <div className="gallery-main">
              SEM IMAGEM
              {off && <span className="badge-off">↓ {off}%</span>}
            </div>
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

            <div className="price-block">
              <div className="price-left">
                {variant.original && <div className="original">{currency(variant.original)}</div>}
                <div className="price">{currency(variant.price)}</div>
                <div className="pix"><Bolt /> À vista no PIX</div>
              </div>
              {off && <span className="badge-off" style={{ position: "static" }}>↓ {off}%</span>}
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
              <p style={{ fontSize: 13.5, color: "rgba(243,239,230,0.65)" }}>{product.forWhom}</p>
            </div>

            <div className="ctas">
              <button
                className="btn btn-solid"
                onClick={() => {
                  if (!user) {
                    navigate("/conta", { state: { from: `/produtos/${id}`, reason: "checkout" } });
                  } else {
                    // usuário já logado — plugar fluxo de checkout real aqui
                    alert("Login confirmado. Próximo passo: checkout (a implementar).");
                  }
                }}
              >
                Comprar agora
              </button>
              <button className="btn btn-line">Solicitar orçamento</button>
            </div>
          </div>
        </div>

        <section className="info">
          <h2 className="info-title">Como funciona</h2>
          <p style={{ fontSize: 14, color: "rgba(243,239,230,0.65)", lineHeight: 1.7 }}>{product.howItWorks}</p>
        </section>

        <section className="info">
          <h2 className="info-title">Perguntas frequentes</h2>
          {product.faq.map((f, i) => (
            <div className="faq-item" key={f.q} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="faq-q">
                <span>{f.q}</span>
                <span style={{ color: "#E3BE86" }}>{openFaq === i ? "–" : "+"}</span>
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
