// marimax-firebase.js
// -----------------------------------------------------------------------
// Configuração central do Firebase para o projeto MARIMAX.
// Importe `auth` e `db` a partir daqui em qualquer página
// (marimax-conta.jsx, marimax-admin.jsx, etc.) em vez de reconfigurar
// o Firebase em cada arquivo.

import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported as analyticsSupported } from "firebase/analytics";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBfs1MRhvjYR7jPdATn541Bx7PK8-9bOaE",
  authDomain: "mg-ia-a7ca6.firebaseapp.com",
  databaseURL: "https://mg-ia-a7ca6-default-rtdb.firebaseio.com",
  projectId: "mg-ia-a7ca6",
  storageBucket: "mg-ia-a7ca6.firebasestorage.app",
  messagingSenderId: "202376014292",
  appId: "1:202376014292:web:be7ee04af906ce44b94e41",
  measurementId: "G-W643BFZ3KG",
};

export const app = initializeApp(firebaseConfig);

// Analytics só funciona no browser (não em SSR) — checagem de suporte evita erro.
export let analytics = null;
analyticsSupported().then((ok) => {
  if (ok) analytics = getAnalytics(app);
});

// --- Auth com login persistente -----------------------------------------
// browserLocalPersistence é o padrão do Firebase, mas deixamos explícito
// aqui de propósito: é isso que garante que o cliente NÃO precisa logar
// de novo toda vez que entrar no site. A sessão só some se o próprio
// usuário clicar em "Sair" ou limpar os dados do navegador.
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.error("Erro ao configurar persistência de login:", err);
});

// --- Banco de dados e arquivos --------------------------------------------
export const db = getFirestore(app);      // produtos, pedidos, clientes, cupons, notícias...
export const storage = getStorage(app);   // imagens de produto, banners, avatares...

/**
 * Coleções sugeridas no Firestore (crie conforme for usando):
 *  - products      (produtos/serviços do catálogo)
 *  - orders        (pedidos)
 *  - customers     (dados de clientes, ligados ao uid do Auth)
 *  - reviews       (avaliações por produto)
 *  - coupons       (cupons de desconto)
 *  - news          (posts do blog/novidades)
 *  - banners       (banners da home/admin)
 *  - siteTexts     (textos editáveis pelo painel ADM)
 *  - adminUsers    (uid + nível de acesso, para regras de segurança)
 *
 * IMPORTANTE — segurança:
 * Nunca controle "quem é admin" só pelo front-end. Configure Firestore
 * Security Rules checando um campo tipo adminUsers/{uid}.role no banco,
 * senão qualquer pessoa pode abrir o painel ADM direto pela URL.
 */
