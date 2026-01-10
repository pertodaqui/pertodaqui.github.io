# pertodaqui.github.io

Site oficial do Pertodaqui (Next.js estático para GitHub Pages).

## Como rodar

```bash
npm install
npm run dev
```

## Deploy no GitHub Pages

```bash
npm run build
npm run export
```

O conteúdo estático será gerado em `out/`. Publique a pasta `out/` no GitHub Pages.
Também deixei um workflow em `.github/workflows/deploy.yml` para publicar via GitHub Actions.

> Dica: se este repositório for um Project Page (ex: `usuario.github.io/projeto`),
> ajuste o `basePath` em `next.config.js`.

## Widgets do GetYourGuide

Os widgets estão configurados com `data-gyg-partner-id="PERTODAQUI"` e IDs de
atividade de exemplo. Troque pelos IDs reais da sua conta GetYourGuide.
