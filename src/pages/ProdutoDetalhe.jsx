import React, { useState } from "react";

/**
 * MARIMAX — Página individual de produto
 * -----------------------------------------------------------------------
 * PRODUCT abaixo é dado de exemplo — troque pelo produto real
 * (ou carregue via rota/Firestore usando o id na URL).
 */
const PRODUCT = {
  name: "Jaqueta Alfaiate 01",
  tag: "Lote 01/40",
  price: 890,
  desc: "Peça de abertura da coleção MARIMAX: jaqueta com modelagem de alfaiate, forro em algodão egípcio e numeração individual gravada por dentro. Produção em lote fechado de 40 unidades.",
  includes: ["Jaqueta numerada", "Certificado de autenticidade", "Saco de proteção em algodão"],
  benefits: ["Corte sob medida por faixa de tamanho", "Tecido nacional premium", "Acabamento manual nas costuras"],
  forWhom: "Para quem quer uma peça de assinatura — não uma peça de vitrine repetida em série.",
  howItWorks: "Após a compra, a peça é finalizada e numerada em até 5 dias úteis, com envio rastreado logo em seguida.",
  faq: [
    { q: "Tem troca de tamanho?", a: "Sim, em até 7 dias corridos após o recebimento, peça sem uso." },
    { q: "O número da peça pode ser escolhido?", a: "Não — a numeração segue a ordem de produção do lote." },
  ],
  reviews: [
    { name: "Cliente verificado", rating: 5, comment: "Acabamento impecável, vale cada centavo." },
  ],
};

function currency(v) {
  if (!v) return "Sob consulta";
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function Stars({ n }) {
  return <span style={{ color: "#C9A96E", fontSize: 13 }}>{"★".repeat(n)}{"☆".repeat(5 - n)}</span>;
}

export default function ProdutoDetalhe() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="mx-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Space+Mono:wght@400;700&family=Work+Sans:wght@300;400;500;600&display=swap');
        :root{ --navy:#0B0E1A; --navy-2:#12172B; --gold:#B08A4E; --gold-soft:#C9A96E; --bone:#F3EFE6; --line:rgba(243,239,230,0.14); }
        .mx-root{ background:var(--navy); color:var(--bone); font-family:'Work Sans',sans-serif; min-height:100vh; }
        .mx-root *{ box-sizing:border-box; }
        .wrap{ padding: 48px 6vw 100px; max-width:1200px; margin:0 auto; }
        .top{ display:grid; grid-template-columns: 1fr 1fr; gap:56px; margin-bottom:70px; }
        @media (max-width:820px){ .top{ grid-template-columns:1fr; gap:32px; } }

        .gallery-main{ aspect-ratio:4/5; background:linear-gradient(135deg, rgba(176,138,78,0.14), rgba(243,239,230,0.03)); border:1px solid var(--line); display:flex; align-items:center; justify-content:center; font-family:'Space Mono',monospace; font-size:11px; color:rgba(243,239,230,0.3); letter-spacing:.1em; margin-bottom:10px; }
        .gallery-thumbs{ display:flex; gap:8px; }
        .thumb{ width:56px; height:56px; border:1px solid var(--line); background:rgba(243,239,230,0.03); }

        .tag{ font-family:'Space Mono',monospace; font-size:11px; letter-spacing:.14em; color:var(--gold-soft); text-transform:uppercase; }
        .name{ font-family:'Fraunces',serif; font-weight:500; font-size:clamp(1.8rem,3.6vw,2.4rem); margin:10px 0 14px; }
        .price{ font-family:'Fraunces',serif; font-size:26px; margin-bottom:20px; }
        .desc{ font-size:14.5px; line-height:1.8; color:rgba(243,239,230,0.72); margin-bottom:26px; }

        .block{ margin-bottom:22px; }
        .block-title{ font-family:'Space Mono',monospace; font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:rgba(243,239,230,0.5); margin-bottom:10px; }
        .block ul{ list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:6px; }
        .block li{ font-size:13.5px; color:rgba(243,239,230,0.75); }
        .block li::before{ content:'— '; color:var(--gold-soft); }

        .ctas{ display:flex; gap:12px; margin-top:28px; }
        .btn{ flex:1; text-align:center; font-size:13px; padding:14px; border-radius:2px; cursor:pointer; letter-spacing:.03em; }
        .btn-solid{ background:var(--gold); color:var(--navy); font-weight:600; border:1px solid var(--gold); }
        .btn-solid:hover{ background:var(--gold-soft); }
        .btn-line{ border:1px solid var(--line); color:var(--bone); }
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
      `}</style>

      <div className="wrap">
        <div className="top">
          <div>
            <div className="gallery-main">SEM IMAGEM</div>
            <div className="gallery-thumbs">
              <div className="thumb" /><div className="thumb" /><div className="thumb" />
            </div>
          </div>

          <div>
            <span className="tag">{PRODUCT.tag}</span>
            <h1 className="name">{PRODUCT.name}</h1>
            <div className="price">{currency(PRODUCT.price)}</div>
            <p className="desc">{PRODUCT.desc}</p>

            <div className="block">
              <div className="block-title">O que está incluído</div>
              <ul>{PRODUCT.includes.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
            <div className="block">
              <div className="block-title">Benefícios</div>
              <ul>{PRODUCT.benefits.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
            <div className="block">
              <div className="block-title">Para quem é</div>
              <p style={{ fontSize: 13.5, color: "rgba(243,239,230,0.72)" }}>{PRODUCT.forWhom}</p>
            </div>

            <div className="ctas">
              <button className="btn btn-solid">Comprar agora</button>
              <button className="btn btn-line">Solicitar orçamento</button>
            </div>
          </div>
        </div>

        <section className="info">
          <h2 className="info-title">Como funciona</h2>
          <p style={{ fontSize: 14, color: "rgba(243,239,230,0.7)", lineHeight: 1.7 }}>{PRODUCT.howItWorks}</p>
        </section>

        <section className="info">
          <h2 className="info-title">Perguntas frequentes</h2>
          {PRODUCT.faq.map((f, i) => (
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
          {PRODUCT.reviews.map((r) => (
            <div className="review" key={r.name + r.comment}>
              <div className="review-head">
                <span className="review-name">{r.name}</span>
                <Stars n={r.rating} />
              </div>
              <div className="review-comment">{r.comment}</div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
