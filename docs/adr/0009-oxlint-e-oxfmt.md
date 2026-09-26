# 0009. Oxlint e oxfmt para lint e formatação

## Contexto

O monorepo precisa de lint e formatação rápidos, consistentes entre CLI, CI e editor. O TypeScript 7 (compilador nativo) é usado no projeto, então regras que dependem de tipos precisam de uma ferramenta compatível com ele.

## Decisão

Usamos as ferramentas do projeto oxc, configuradas na raiz:

- **oxlint** (`.oxlintrc.json`) para lint.
  - Categorias `correctness` e `suspicious` como erro, `perf` como aviso, e `denyWarnings` ativo, então qualquer aviso quebra o CI.
  - Lint com checagem de tipos (`options.typeAware`), via `oxlint-tsgolint`, que usa o TypeScript nativo. Isso habilita regras como `no-floating-promises`, `no-misused-promises` e `await-thenable`.
  - Plugins `typescript`, `unicorn`, `oxc`, `import`, `promise` e `vitest` em todo o repositório. No frontend, também `react`, `jsx-a11y` e `react-perf`; no backend, também `node`.
  - Regras reforçadas: `no-explicit-any`, `no-non-null-assertion`, `no-console`, `consistent-type-imports` (obriga `import type` quando o import só é usado como tipo), `import/no-cycle` e `vitest/consistent-test-it` com `test`.
  - Única exceção ao `consistent-type-imports`: os controllers do Nest (`*.controller.ts`). Com `emitDecoratorMetadata`, o Nest lê em runtime a classe de cada parâmetro do construtor para saber o que injetar, e `import type` apagaria essa referência, quebrando a injeção de dependência.
  - Regras desligadas, com motivo:
    - `vitest/require-mock-type-parameters`: os tipos dos mocks já são inferidos pelo uso.
    - `promise/no-promise-in-callback`: dá falso positivo com o método `catch` dos exception filters do Nest.
    - Nos testes, `no-unsafe-type-assertion` e `unbound-method`: test doubles precisam deles.
- **oxfmt** (`.oxfmtrc.json`) para formatação.
  - A configuração foi migrada do Biome com `oxfmt --migrate=biome`.
  - Aspas simples em todo o código, inclusive nos atributos JSX (`singleQuote`, `jsxSingleQuote`).
  - Sem ponto e vírgula (`semi: false`). O formatador só o insere quando a linha seguinte exige, para evitar ambiguidade na inserção automática.
  - Ordenação de imports (`sortImports`) ativa.
  - Ordenação das classes do Tailwind (`sortTailwindcss`), apontando para o stylesheet do frontend e para as funções `cn` e `cva`.
- **Pre-commit**: husky roda o lint-staged, que executa `oxlint --fix` e `oxfmt` só nos arquivos no stage. Qualquer erro de lint bloqueia o commit, e as correções de formatação voltam para o stage automaticamente. O hook é instalado pelo script `prepare` no `pnpm install`.
- **Fim de linha**: `.gitattributes` fixa LF, para o Git e o formatador não brigarem no Windows.
- **Scripts**: `pnpm lint`, `pnpm lint:fix`, `pnpm format` e `pnpm format:check`. O CI roda `lint` e `format:check`.
- **Editor**: `.vscode/extensions.json` recomenda a extensão oficial `oxc.oxc-vscode` e desaconselha as de Biome, ESLint e Prettier. `.vscode/settings.json` usa essa extensão como formatador padrão, formata ao salvar e aplica as correções do oxlint com `source.fixAll.oxc`.

## Consequências

- Lint com checagem de tipos em cerca de 1 segundo no repositório inteiro, e a mesma configuração no terminal, no CI e no editor.
- Regras que não existem como lint, como "sem comentários no código", continuam garantidas na revisão.
