# PertoDaqui

Plataforma web para descobrir passeios, hospedagens, comida e experiências perto do usuário. O foco é entregar sugestões por raio, com filtros por categoria, detalhes rápidos e rotas diretas no mapa.

## Produto

Principais funcionalidades:
- Busca por raio (slider de distancia) com sugestoes proximas.
- Filtros multi-seleção de categorias (dropdown).
- Cards com imagem, distancia, categoria, rota e temperatura atual.
- CTA para divulgacao de negocios e contato por email.
- Páginas legais: Política de Privacidade e Termos de Uso.

## Stack

- Next.js 14 (export estatico).
- React 18.
- Phosphor Icons.
- CSS global em `styles/globals.css`.

## Estrutura do projeto

- `pages/index.js`: pagina principal e logica de filtros.
- `pages/privacidade.js`: política de privacidade.
- `pages/termos.js`: termos de uso.
- `data/`: coleções por categoria (ex.: `tours.js`, `hotels.js`, `bars.js`).
- `data/parks_nature.js`: agregacao de parques + natureza.
- `styles/globals.css`: layout e estilos globais.

## Dados e APIs

- Dados locais em `data/*.js` (array de objetos com `id`, `title`, `meta`, `location`, `image`, `lat`, `lng`).
- Temperatura atual via Open-Meteo:
  - `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lng}&current_weather=true`
- Geolocalização via `navigator.geolocation`.

## Analytics

Google Analytics 4 (gtag) configurado em `pages/_app.js` com o ID `G-6HQDMXR4BL`.

## Como rodar

```bash
npm install
npm run dev
```

## Build e export estatico

```bash
npm run build
npm run export
```

Os arquivos estáticos ficam em `out/`.

## Deploy no GitHub Pages

O workflow de deploy está em `.github/workflows/deploy.yml`, que publica o diretório `out/` via GitHub Actions.

Checklist:
- `Settings > Pages > Build and deployment` -> Source: **GitHub Actions**
- Branch principal: `main`

## Observações de engenharia

- O site é gerado estaticamente, sem API server-side.
- O filtro agrega categorias selecionadas e mescla resultados por categoria.
- O clima é buscado no client e cacheado por coordenada para evitar repetição.
- Ícones padronizados com Phosphor Icons.

## Roadmap

- Criar painel para negócios parceiros (cadastro e pagamento).
- Ordenação por relevância (distância, destaque, avaliação).
- Dados dinamicos por cidade (CMS ou API).
- PWA com cache offline para areas com sinal fraco.
- Eventos e roteiros tematicos.

## Backlog tecnico

- Padronizar fontes de dados em um formato único e validar schema.
- Reduzir duplicidade entre dados agregados (parks + nature).
- Melhorar performance do fetch de clima (batch e backoff).
- Adicionar testes básicos de render e filtros.
- Documentar pipeline de deploy e rollback.

## Contribuição

1. Crie um branch a partir de `main`.
2. Rode `npm install` e `npm run dev`.
3. Mantenha o código simples e legível.
4. Abra um PR descrevendo a mudança e o impacto.

## Contato

Email: `contato@pertodaqui.com`
