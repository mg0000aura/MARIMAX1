// src/data/products.js
// -----------------------------------------------------------------------
// Catálogo real da MARIMAX (produtos digitais). Ajuste nomes, textos e
// preços aqui — Produtos.jsx e ProdutoDetalhe.jsx puxam tudo daqui.
//
// IMPORTANTE: revisei os preços que você mandou e organizei como
// "variações" de cada produto. Confirma se bateu certo, principalmente:
//  - Cardápio: entendi como De R$24,99 por R$14,97 (versão Básico)
//  - Anúncio: entendi como faixa de R$19,97 até R$50
//  - Planilha: 3 opções — R$10, R$20 e R$49,97
//  - Tabela: 2 opções — R$9,97 e R$30,00
export const CATEGORIES = ["Todos", "Cardápio", "Anúncio", "Planilha", "Tabela"];

export const PRODUCTS = [
  {
    id: "cardapio",
    name: "Cardápio",
    category: "Cardápio",
    tag: "Pronto para editar",
    desc: "Cardápio digital pronto para personalizar com o cardápio do seu negócio — layout limpo, fácil de editar e pronto para imprimir ou enviar por WhatsApp.",
    variants: [
      { label: "Básico", price: 14.97, original: 24.99 },
    ],
    includes: ["Arquivo editável", "Guia rápido de edição"],
    benefits: ["Pronto em minutos", "Sem precisar de designer"],
    forWhom: "Para quem tem restaurante, lanchonete ou delivery e precisa de um cardápio profissional sem contratar um design do zero.",
    howItWorks: "Após a compra, você recebe o arquivo por e-mail/link e edita direto com seus produtos e preços.",
    faq: [
      { q: "Preciso saber usar programa de design?", a: "Não — o arquivo vem com instruções simples de edição." },
      { q: "Posso imprimir?", a: "Sim, o arquivo já sai pronto para impressão." },
    ],
    reviews: [],
  },
  {
    id: "anuncio",
    name: "Anúncio",
    category: "Anúncio",
    tag: "Para redes sociais",
    desc: "Peça de anúncio pronta para usar em redes sociais ou impressos, com variações de preço conforme o pacote escolhido.",
    variants: [
      { label: "A partir de", price: 19.97 },
      { label: "Pacote completo", price: 50 },
    ],
    includes: ["Arte editável", "Formatos para redes sociais"],
    benefits: ["Entrega rápida", "Visual profissional"],
    forWhom: "Para quem precisa divulgar promoções, produtos ou serviços com identidade visual profissional.",
    howItWorks: "Escolha o pacote, envie as informações do seu anúncio e receba a arte pronta.",
    faq: [
      { q: "Qual a diferença entre os pacotes?", a: "O pacote completo inclui mais variações e formatos de arte." },
    ],
    reviews: [],
  },
  {
    id: "planilha",
    name: "Planilha",
    category: "Planilha",
    tag: "Organização financeira",
    desc: "Planilhas prontas para organizar seu negócio ou finanças pessoais, em três opções de tamanho/complexidade.",
    variants: [
      { label: "Opção 1", price: 10 },
      { label: "Opção 2", price: 20 },
      { label: "Opção 3", price: 49.97 },
    ],
    includes: ["Arquivo editável (Excel/Google Sheets)", "Fórmulas prontas"],
    benefits: ["Sem mensalidade", "Uso ilimitado"],
    forWhom: "Para quem quer controlar vendas, gastos ou estoque sem depender de sistema pago.",
    howItWorks: "Escolha a opção ideal para o seu negócio e comece a usar na hora.",
    faq: [
      { q: "Funciona no celular?", a: "Sim, funciona no Google Sheets pelo celular ou computador." },
    ],
    reviews: [],
  },
  {
    id: "tabela",
    name: "Tabela",
    category: "Tabela",
    tag: "Preços e catálogo",
    desc: "Tabela de preços/catálogo pronta para divulgar seus produtos ou serviços de forma organizada.",
    variants: [
      { label: "Opção 1", price: 9.97 },
      { label: "Opção 2", price: 30 },
    ],
    includes: ["Arquivo editável"],
    benefits: ["Visual organizado", "Fácil de atualizar"],
    forWhom: "Para quem precisa apresentar preços de forma clara para os clientes.",
    howItWorks: "Escolha a opção, personalize com seus produtos e preços.",
    faq: [
      { q: "Posso atualizar os preços depois?", a: "Sim, o arquivo é seu e pode editar quando quiser." },
    ],
    reviews: [],
  },
];

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

export function currency(v) {
  if (v === undefined || v === null) return "Sob consulta";
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
