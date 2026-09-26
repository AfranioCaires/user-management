# 0002. Monorepo com pnpm workspaces

## Contexto

O desafio pede uma aplicação React e uma aplicação Node.js. As duas compartilham ferramentas (TypeScript, oxlint, oxfmt, Vitest) e são revisadas juntas.

Chegamos a ter um BFF entre as duas, mas ele foi removido: para uma única tela, o custo de mais um serviço, mais variáveis de ambiente e mais uma camada de mapeamento não se pagava. O frontend consome a API diretamente.

## Decisão

Um único repositório contém `apps/frontend` e `apps/backend`, gerenciados com pnpm workspaces.

- O `package.json` da raiz expõe os scripts de orquestração: `dev`, `build`, `test`, `typecheck` e `lint`.
- Cada app declara as próprias dependências e scripts, e tem o próprio `.env.example`.
- Não há pacotes internos compartilhados. O frontend mantém a própria cópia do contrato da API (schemas Zod), então cada app evolui e é publicado de forma independente.

## Consequências

- Uma instalação, um lockfile, um pipeline de CI e mudanças atômicas entre os apps.
- O contrato da API é duplicado de propósito no frontend. O custo é pequeno e evita acoplamento acidental.
- O `node_modules` estrito do pnpm revela cedo dependências não declaradas.
