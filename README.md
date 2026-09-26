# UbiSafe · Gerenciamento de Usuários

Tela de gerenciamento de usuários: lista em tabela responsiva, filtros por nome e status, paginação, edição do nome e remoção. Segue o [design do Figma](https://www.figma.com/design/Z6RcdxV2FkFq3wuMBAOWkm/Frontend-Assignment?node-id=116-3050).

```
┌────────────────────┐   /characters   ┌────────────────────┐
│   apps/frontend    │ ──────────────▶ │    apps/backend    │
│ React · shadcn/ui  │                 │ NestJS · DDD/Clean │
└────────────────────┘                 └────────────────────┘
        :5173                                  :3001
```

| App             | Responsabilidade                                                                                                           |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `apps/frontend` | React 19, TypeScript, Tailwind CSS 4, shadcn/ui (Radix), React Query, React Router, React Hook Form, Zod, Axios, Storybook |
| `apps/backend`  | API NestJS com DDD e Clean Architecture: use cases sobre uma fonte de dados em memória no modelo da API Rick and Morty     |

## Requisitos

- Node.js 24 (veja `.nvmrc`)
- pnpm 12 (`corepack enable` ou `npm i -g pnpm`)

## Como rodar

```bash
pnpm install
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env
pnpm dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001/characters

As variáveis de ambiente não têm valor padrão no código. Sem elas, os apps não sobem.

| App      | Variável       | Descrição                                 |
| -------- | -------------- | ----------------------------------------- |
| backend  | `PORT`         | Porta HTTP                                |
| backend  | `CORS_ORIGIN`  | Origens permitidas, separadas por vírgula |
| frontend | `VITE_API_URL` | URL base do backend                       |

## Scripts

| Comando                | Descrição                                 |
| ---------------------- | ----------------------------------------- |
| `pnpm dev`             | Sobe frontend e backend em modo watch     |
| `pnpm build`           | Gera o build dos dois apps                |
| `pnpm test`            | Roda todas as suítes do Vitest            |
| `pnpm typecheck`       | Checa os tipos dos dois apps              |
| `pnpm lint`            | Lint com oxlint (com checagem de tipos)   |
| `pnpm lint:fix`        | Aplica as correções do oxlint             |
| `pnpm format`          | Formata o código com oxfmt                |
| `pnpm format:check`    | Verifica a formatação                     |
| `pnpm storybook`       | Abre o Storybook em http://localhost:6006 |
| `pnpm build-storybook` | Gera o Storybook estático                 |

Dentro de cada app: `pnpm test:cov` para cobertura e `pnpm test:watch` para modo watch.

## Contrato da API

| Método   | Rota              | Descrição                                                                                          |
| -------- | ----------------- | -------------------------------------------------------------------------------------------------- |
| `GET`    | `/characters`     | `page`, `limit` (1–100), `name`, `status` (`alive`, `dead`, `unknown`, sem diferenciar maiúsculas) |
| `PATCH`  | `/characters/:id` | Corpo `{ "name": string }`, de 1 a 100 caracteres                                                  |
| `DELETE` | `/characters/:id` | `204` em caso de sucesso                                                                           |

```json
{
  "info": { "count": 6748, "pages": 450, "next": 2, "prev": null },
  "results": [
    {
      "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "species": "Human",
      "type": "",
      "gender": "Male",
      "origin": { "name": "Earth", "url": "…" },
      "location": { "name": "Citadel of Ricks", "url": "…" },
      "image": "…",
      "episode": ["…"],
      "url": "…",
      "created": "2024-02-22T00:00:00.000Z"
    }
  ]
}
```

Erros: `400` para entrada inválida, `404` para personagem inexistente e `422` para nome rejeitado pelo domínio. Toda resposta devolve (ou gera) o header `x-request-id`.

## Estrutura

```
apps/
  backend/src/
    modules/characters/{domain,application,infrastructure,presentation}
    shared/{domain,presentation}
    config/
  frontend/src/
    app/        providers e router
    layouts/    molduras de página
    features/   users: api, model, hooks, components, pages
    shared/     ui (shadcn), components, lib, hooks, config
docs/adr/       registros de decisão de arquitetura
```

## Pre-commit

Ao rodar `pnpm install`, o husky instala um hook de pre-commit que roda `oxlint --fix` e `oxfmt` nos arquivos no stage (via lint-staged). Erros de lint bloqueiam o commit.

## Editor

O repositório inclui `.vscode/` com a extensão recomendada [Oxc](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode) (`oxc.oxc-vscode`). Ao abrir o projeto, o VS Code sugere a instalação. Com ela, o oxlint roda enquanto você digita e o oxfmt formata ao salvar.

## Documentação

As decisões de arquitetura e seus trade-offs estão em [`docs/adr`](docs/adr/README.md).
