# PertoDaqui

Plataforma web para descobrir passeios, hospedagens, comida e experiencias perto do usuario. O foco e entregar sugestoes por raio, com filtros por categoria, detalhes rapidos e rotas diretas no mapa.

## Produto

Principais funcionalidades:
- Busca por raio (slider de distancia) com sugestoes proximas.
- Filtros multi-selecao de categorias (dropdown).
- Cards com imagem, distancia, categoria, rota e temperatura atual.
- CTA para divulgacao de negocios e contato por email.
- Paginas legais: Politica de Privacidade e Termos de Uso.

## Stack

- Next.js 14 (export estatico).
- React 18.
- Phosphor Icons.
- CSS global em `styles/globals.css`.

## Estrutura do projeto

- `pages/index.js`: pagina principal e logica de filtros.
- `pages/privacidade.js`: politica de privacidade.
- `pages/termos.js`: termos de uso.
- `data/`: colecoes por categoria (ex.: `tours.js`, `hotels.js`, `bars.js`).
- `data/parks_nature.js`: agregacao de parques + natureza.
- `styles/globals.css`: layout e estilos globais.

## Dados e APIs

- Dados locais em `data/*.js` (array de objetos com `id`, `title`, `meta`, `location`, `image`, `lat`, `lng`).
- Temperatura atual via Open-Meteo:
  - `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lng}&current_weather=true`
- Geolocalizacao via `navigator.geolocation`.

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

Os arquivos estaticos ficam em `out/`.

## Deploy no GitHub Pages

O workflow de deploy esta em `.github/workflows/deploy.yml`, que publica o diretorio `out/` via GitHub Actions.

Checklist:
- `Settings > Pages > Build and deployment` -> Source: **GitHub Actions**
- Branch principal: `main`

## Observacoes de engenharia

- O site e gerado estaticamente, sem API server-side.
- O filtro agrega categorias selecionadas e mescla resultados por categoria.
- O clima e buscado no client e cacheado por coordenada para evitar repeticao.
- Icones padronizados com Phosphor Icons.

## Roadmap

- Criar painel para negocios parceiros (cadastro e pagamento).
- Ordenacao por relevancia (distancia, destaque, avaliacao).
- Dados dinamicos por cidade (CMS ou API).
- PWA com cache offline para areas com sinal fraco.
- Eventos e roteiros tematicos.

## Backlog tecnico

- Padronizar fontes de dados em um formato unico e validar schema.
- Reduzir duplicidade entre dados agregados (parks + nature).
- Melhorar performance do fetch de clima (batch e backoff).
- Adicionar testes basicos de render e filtros.
- Documentar pipeline de deploy e rollback.

## Contribuicao

1. Crie um branch a partir de `main`.
2. Rode `npm install` e `npm run dev`.
3. Mantenha o codigo simples e legivel.
4. Abra um PR descrevendo a mudanca e o impacto.

## Contato

Email: `contato@pertodaqui.com`
