import React, { useEffect, useRef, useState } from "react";

/**
 * MARIMAX — Home
 * -----------------------------------------------------------------------
 * ATUALIZE AQUI conforme a empresa cresce (números reais, textos, links).
 * Nada aqui é inventado como "dado real" — os números começam em 0/"—"
 * de propósito, prontos para você preencher.
 */
const COMPANY = {
  slogan: "Alfaiataria com atitude de rua.",
  description:
    "A MARIMAX desenha e cura peças que cruzam o acabamento da alfaiataria com a atitude da rua. Cada lançamento é numerado, rastreável e feito para durar.",
  whatWeDo:
    "Criamos, produzimos e curamos peças autorais — do desenho à entrega. Trabalhamos em lotes pequenos, com acabamento premium e identidade forte, para quem não quer se vestir como todo mundo.",
  products: [
    { name: "Streetwear autoral", desc: "Peças de coleção própria, numeradas e datadas." },
    { name: "Edições limitadas", desc: "Drops pequenos, produção controlada, sem reposição." },
    { name: "Acessórios em couro e metal", desc: "Detalhes que fecham o look — feitos à mão." },
    { name: "Consultoria de estilo", desc: "Curadoria sob encomenda para quem prefere ser vestido, não seguir tendência." },
  ],
  diffs: [
    { title: "Numeradas", text: "Cada peça leva um número de série. Você sabe exatamente o que tem." },
    { title: "Lote curto", text: "Produzimos pouco, de propósito. Raridade não é discurso de marketing." },
    { title: "Acabamento de alfaiate", text: "Corte e costura tratados como em terno, aplicados à rua." },
    { title: "Origem rastreável", text: "Do ateliê até você — sem intermediário escondendo processo." },
  ],
  // Deixe em 0 até ter o número real. Troque quando quiser.
  stats: { projects: 0, products: 0 },
};

/* ---------------------------- SVG do símbolo ---------------------------- */
function MarkSVG({ variant = "gold", drawn }) {
  const stroke = variant === "gold" ? "#B08A4E" : variant === "bone" ? "#F3EFE6" : "#0E1220";
  return (
    <svg viewBox="0 0 220 220" width="100%" height="100%" fill="none">
      <polygon
        points="110,14 206,110 110,206 14,110"
        stroke={stroke}
        strokeWidth="2.4"
        className={`mk-path mk-diamond ${drawn ? "mk-drawn" : ""}`}
      />
      <path
        d="M70 66 L110 132 L150 66 M78 66 L78 154 M142 66 L142 154"
        stroke={stroke}
        strokeWidth="2.4"
        strokeLinecap="square"
        className={`mk-path mk-m ${drawn ? "mk-drawn" : ""}`}
      />
    </svg>
  );
}

/* ------------------------------- Selo/stamp ------------------------------ */
function Stamp({ label = "MARIMAX · EST." }) {
  return (
    <span className="stamp">
      <svg viewBox="0 0 44 44" width="22" height="22" aria-hidden="true">
        <circle cx="22" cy="22" r="20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 3" />
        <circle cx="22" cy="22" r="14" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      {label}
    </span>
  );
}

/* -------------------------- Revelação ao rolar --------------------------- */
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShown(true),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ as: Tag = "div", className = "", children }) {
  const [ref, shown] = useReveal();
  return (
    <Tag ref={ref} className={`${className} reveal ${shown ? "reveal-in" : ""}`}>
      {children}
    </Tag>
  );
}

/* --------------------------------- Contador ------------------------------ */
function Counter({ value }) {
  const [ref, shown] = useReveal();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!shown) return;
    if (value === 0) return;
    let start = null;
    const dur = 900;
    function step(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setN(Math.floor(p * value));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [shown, value]);
  return (
    <span ref={ref} className="stat-num">
      {value === 0 ? "—" : n}
    </span>
  );
}

export default function Home() {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="mx-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600&family=Space+Mono:wght@400;700&family=Work+Sans:wght@300;400;500;600&display=swap');

        :root{
          --navy:#0B0E1A;
          --navy-2:#12172B;
          --gold:#B08A4E;
          --gold-soft:#C9A96E;
          --bone:#F3EFE6;
          --ink:#1B1B1F;
          --line: rgba(243,239,230,0.14);
        }
        .mx-root{
          background:var(--navy);
          color:var(--bone);
          font-family:'Work Sans', sans-serif;
          -webkit-font-smoothing:antialiased;
          overflow-x:hidden;
        }
        .mx-root *{box-sizing:border-box;}
        .mx-root a{color:inherit; text-decoration:none;}

        /* ---------- header ---------- */
        .nav{
          position:fixed; top:0; left:0; right:0; z-index:20;
          display:flex; align-items:center; justify-content:space-between;
          padding: 20px 6vw;
          background:linear-gradient(180deg, rgba(11,14,26,0.92), rgba(11,14,26,0));
        }
        .nav-logo{display:flex; align-items:center; gap:10px;}
        .nav-logo .mark{width:26px; height:26px;}
        .nav-word{font-family:'Fraunces', serif; letter-spacing:0.14em; font-size:15px; font-weight:500;}
        .nav-links{display:flex; gap:28px; font-size:13px; letter-spacing:0.05em; color:rgba(243,239,230,0.75);}
        .nav-links a:hover{color:var(--gold-soft);}
        .nav-cta{
          font-size:12px; letter-spacing:0.08em; padding:8px 16px;
          border:1px solid rgba(243,239,230,0.35); border-radius:2px;
        }
        .nav-cta:hover{border-color:var(--gold-soft); color:var(--gold-soft);}
        @media (max-width:760px){ .nav-links{display:none;} }

        /* ---------- hero ---------- */
        .hero{
          position:relative;
          min-height:100svh;
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          text-align:center;
          padding: 120px 6vw 80px;
        }
        .hero-bg{
          position:absolute; inset:0; z-index:0; pointer-events:none;
          background:
            radial-gradient(ellipse at 50% 20%, rgba(176,138,78,0.14), transparent 55%),
            repeating-linear-gradient(115deg, rgba(243,239,230,0.035) 0px, rgba(243,239,230,0.035) 1px, transparent 1px, transparent 64px);
        }
        .hero-mark{ width:132px; height:132px; margin:0 auto 28px; position:relative; z-index:1; }
        .mk-path{
          stroke-dasharray: 700;
          stroke-dashoffset: 700;
          transition: stroke-dashoffset 1.6s cubic-bezier(.16,.84,.44,1);
        }
        .mk-m{ transition-delay: .35s; }
        .mk-drawn{ stroke-dashoffset: 0; }

        .hero-word{
          font-family:'Fraunces', serif;
          font-weight:500;
          font-size: clamp(2.6rem, 8vw, 5.4rem);
          letter-spacing:0.05em;
          line-height:1;
          margin:0 0 18px;
          position:relative; z-index:1;
        }
        .hero-slogan{
          font-family:'Fraunces', serif;
          font-style:italic;
          font-weight:300;
          font-size: clamp(1.1rem, 2.4vw, 1.5rem);
          color:var(--gold-soft);
          margin:0 0 18px;
          position:relative; z-index:1;
        }
        .hero-desc{
          max-width:520px; margin:0 auto 40px;
          color:rgba(243,239,230,0.72);
          font-size:15px; line-height:1.7;
          position:relative; z-index:1;
        }
        .hero-ctas{ display:flex; gap:16px; flex-wrap:wrap; justify-content:center; position:relative; z-index:1; }
        .btn{
          font-size:13px; letter-spacing:0.06em; padding:14px 26px;
          border-radius:2px; cursor:pointer; transition:all .25s ease;
        }
        .btn-solid{ background:var(--gold); color:var(--navy); border:1px solid var(--gold); font-weight:600;}
        .btn-solid:hover{ background:var(--gold-soft); }
        .btn-line{ border:1px solid rgba(243,239,230,0.35); color:var(--bone); }
        .btn-line:hover{ border-color:var(--gold-soft); color:var(--gold-soft); }

        .scroll-cue{
          position:absolute; bottom:28px; left:50%; transform:translateX(-50%);
          font-family:'Space Mono', monospace; font-size:10px; letter-spacing:0.2em;
          color:rgba(243,239,230,0.4); display:flex; flex-direction:column; align-items:center; gap:8px;
        }
        .scroll-cue::after{
          content:''; width:1px; height:34px; background:rgba(243,239,230,0.3);
          animation: cue 1.8s ease-in-out infinite;
        }
        @keyframes cue{ 0%{transform:scaleY(0); transform-origin:top;} 50%{transform:scaleY(1); transform-origin:top;} 51%{transform-origin:bottom;} 100%{transform:scaleY(0); transform-origin:bottom;} }

        /* ---------- stamp ---------- */
        .stamp{
          display:inline-flex; align-items:center; gap:8px;
          font-family:'Space Mono', monospace; font-size:11px; letter-spacing:0.14em;
          color:var(--gold-soft); text-transform:uppercase;
        }

        /* ---------- section shell ---------- */
        section{ padding: 110px 6vw; position:relative; }
        .sec-head{ max-width:640px; margin-bottom:56px; }
        .sec-title{
          font-family:'Fraunces', serif; font-weight:500;
          font-size: clamp(1.7rem, 3.4vw, 2.5rem);
          margin: 14px 0 0;
        }

        .reveal{ opacity:0; transform:translateY(22px); transition: opacity .7s ease, transform .7s ease; }
        .reveal-in{ opacity:1; transform:translateY(0); }

        /* ---------- what we do ---------- */
        .what{ background:var(--navy-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
        .what-grid{ display:grid; grid-template-columns: 1.1fr 1fr; gap:64px; align-items:start; }
        .what-text{ color:rgba(243,239,230,0.78); font-size:15.5px; line-height:1.8; }
        .prod-list{ display:flex; flex-direction:column; }
        .prod-item{ padding:18px 0; border-bottom:1px solid var(--line); }
        .prod-item:first-child{ border-top:1px solid var(--line); }
        .prod-name{ font-family:'Fraunces', serif; font-size:17px; margin:0 0 4px; }
        .prod-desc{ font-size:13.5px; color:rgba(243,239,230,0.55); margin:0; }
        @media (max-width:820px){ .what-grid{ grid-template-columns:1fr; gap:40px; } }

        /* ---------- differentiators ---------- */
        .diff-grid{ display:grid; grid-template-columns: repeat(4, 1fr); gap:1px; background:var(--line); border:1px solid var(--line); }
        .diff-card{ background:var(--navy); padding:32px 26px; }
        .diff-title{ font-family:'Fraunces', serif; font-size:16px; color:var(--gold-soft); margin:0 0 10px; }
        .diff-text{ font-size:13.5px; line-height:1.6; color:rgba(243,239,230,0.65); margin:0; }
        @media (max-width:900px){ .diff-grid{ grid-template-columns: repeat(2,1fr); } }
        @media (max-width:520px){ .diff-grid{ grid-template-columns: 1fr; } }

        .sec-cta{ margin-top:44px; }

        /* ---------- stats ---------- */
        .stats{ background:var(--navy-2); border-bottom:1px solid var(--line); }
        .stats-grid{ display:flex; gap:80px; flex-wrap:wrap; }
        .stat-num{
          font-family:'Fraunces', serif; font-weight:500;
          font-size: clamp(2.6rem, 6vw, 4rem); color:var(--gold-soft); display:block; line-height:1;
        }
        .stat-label{ font-family:'Space Mono', monospace; font-size:11px; letter-spacing:0.14em; color:rgba(243,239,230,0.55); text-transform:uppercase; margin-top:10px; display:block; }
        .stats-note{ margin-top:36px; font-size:12px; color:rgba(243,239,230,0.35); font-style:italic; }

        /* ---------- footer ---------- */
        footer{ padding:56px 6vw 40px; border-top:1px solid var(--line); }
        .foot-top{ display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:32px; margin-bottom:36px; }
        .foot-links{ display:flex; gap:28px; flex-wrap:wrap; font-size:12.5px; color:rgba(243,239,230,0.6); }
        .foot-links a:hover{ color:var(--gold-soft); }
        .foot-bottom{ font-size:11.5px; color:rgba(243,239,230,0.35); display:flex; justify-content:space-between; flex-wrap:wrap; gap:12px; }
      `}</style>

      {/* NAV */}
      <header className="nav">
        <div className="nav-logo">
          <span className="mark"><MarkSVG variant="gold" drawn={drawn} /></span>
          <span className="nav-word">MARIMAX</span>
        </div>
        <nav className="nav-links">
          <a href="#o-que-fazemos">A empresa</a>
          <a href="#produtos">Produtos</a>
          <a href="#diferenciais">Diferenciais</a>
        </nav>
        <a href="#produtos" className="nav-cta">Entrar</a>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-mark"><MarkSVG variant="gold" drawn={drawn} /></div>
        <h1 className="hero-word">MARIMAX</h1>
        <p className="hero-slogan">{COMPANY.slogan}</p>
        <p className="hero-desc">{COMPANY.description}</p>
        <div className="hero-ctas">
          <a href="#o-que-fazemos" className="btn btn-solid">Conheça a empresa</a>
          <a href="#produtos" className="btn btn-line">Nossos produtos/serviços</a>
        </div>
        <div className="scroll-cue">ROLAR</div>
      </section>

      {/* O QUE FAZEMOS + PRODUTOS */}
      <section className="what" id="o-que-fazemos">
        <Reveal className="sec-head">
          <Stamp />
          <h2 className="sec-title">O que a MARIMAX faz</h2>
        </Reveal>
        <div className="what-grid">
          <Reveal className="what-text">
            <p>{COMPANY.whatWeDo}</p>
          </Reveal>
          <Reveal className="prod-list" id="produtos">
            {COMPANY.products.map((p) => (
              <div className="prod-item" key={p.name}>
                <p className="prod-name">{p.name}</p>
                <p className="prod-desc">{p.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section id="diferenciais">
        <Reveal className="sec-head">
          <Stamp label="MARIMAX · DIFERENCIAIS" />
          <h2 className="sec-title">Por que MARIMAX</h2>
        </Reveal>
        <Reveal className="diff-grid">
          {COMPANY.diffs.map((d) => (
            <div className="diff-card" key={d.title}>
              <p className="diff-title">{d.title}</p>
              <p className="diff-text">{d.text}</p>
            </div>
          ))}
        </Reveal>
        <Reveal className="sec-cta">
          <a href="#o-que-fazemos" className="btn btn-line">Saiba mais</a>
        </Reveal>
      </section>

      {/* NÚMEROS */}
      <section className="stats">
        <Reveal className="sec-head">
          <Stamp label="MARIMAX · EM NÚMEROS" />
          <h2 className="sec-title">A empresa em números</h2>
        </Reveal>
        <Reveal className="stats-grid">
          <div>
            <Counter value={COMPANY.stats.projects} />
            <span className="stat-label">Projetos</span>
          </div>
          <div>
            <Counter value={COMPANY.stats.products} />
            <span className="stat-label">Produtos</span>
          </div>
        </Reveal>
        <p className="stats-note">Números reais — atualize em COMPANY.stats conforme a empresa cresce.</p>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="foot-top">
          <div className="nav-logo">
            <span className="mark" style={{ width: 22, height: 22 }}>
              <MarkSVG variant="bone" drawn={drawn} />
            </span>
            <span className="nav-word">MARIMAX</span>
          </div>
          <div className="foot-links">
            <a href="#">Termos de uso</a>
            <a href="#">Política de privacidade</a>
            <a href="#">Política de cookies</a>
            <a href="#">Política de compra</a>
            <a href="#">Suporte</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} MARIMAX. Todos os direitos reservados.</span>
          <span>Feito sob medida.</span>
        </div>
      </footer>
    </div>
  );
}
