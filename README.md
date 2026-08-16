# MARIMAX — Site

Projeto React (Vite) com as páginas: Home, Produtos, Produto individual,
Área do cliente (Firebase Auth) e Painel ADM.

## Rodar localmente
```bash
npm install
npm run dev
```
Abre em `http://localhost:5173`.

## Páginas
- `/` — Home
- `/produtos` — Catálogo
- `/produtos/:id` — Produto individual
- `/conta` — Login / área do cliente
- `/admin` — Painel administrativo

## Subir pro GitHub
```bash
git init
git add .
git commit -m "MARIMAX site inicial"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/marimax-site.git
git push -u origin main
```

## Publicar na Vercel
1. Entre em vercel.com → **Add New Project**.
2. Selecione o repositório `marimax-site` que você acabou de subir.
3. Em **Framework Preset**, escolha **Vite** (a Vercel costuma detectar sozinha).
4. Build Command: `npm run build` — Output Directory: `dist` (já vem certo por padrão com Vite).
5. Clique em **Deploy**.

### Por que o site não apareceu da vez anterior
Os arquivos `.jsx` que você tinha antes eram só componentes soltos — sem
`package.json`, sem `index.html`, sem ponto de entrada (`main.jsx`) e sem
rotas. A Vercel builda um projeto, não um componente avulso; por isso
não tinha nada pra ela publicar. Esse projeto novo já tem tudo isso.

## Se o deploy falhar na Vercel
- Confira o **Build Log** na aba do deploy — geralmente aponta o pacote que faltou.
- Se dependência do Firebase reclamar, confirme que `firebase` está em `dependencies` no `package.json` (já está).
- Se a URL `/produtos` ou `/admin` der 404 ao recarregar a página direto, confirme que o `vercel.json` (rewrites para SPA) está na raiz do projeto — ele já está incluído aqui.
