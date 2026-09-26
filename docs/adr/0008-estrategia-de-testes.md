# 0008. Estratégia de testes com Vitest

## Contexto

O desafio pede testes unitários para componentes, controllers, middlewares e funcionalidades. Um único runner nos dois apps mantém as ferramentas uniformes.

## Decisão

O Vitest é o único runner de testes. Todo teste usa `test('deve …')`, com a descrição em português, enquanto o código permanece em inglês.

| App      | Nível                | Exemplos                                                                                 |
| -------- | -------------------- | ---------------------------------------------------------------------------------------- |
| backend  | Domínio              | `CharacterName`, `Character`                                                             |
| backend  | Use cases            | listar, renomear e remover, contra o repositório em memória                              |
| backend  | Adaptadores          | repositório em memória, seed determinístico                                              |
| backend  | Apresentação         | factory de erros de validação, filtro de erros de domínio, middleware de request id, env |
| backend  | Integração HTTP      | `test/characters.e2e.spec.ts`, com Supertest e o repositório substituído                 |
| frontend | Unitário             | funções puras, cliente da API com o HTTP mockado (contrato e mapeamento)                 |
| frontend | Componente           | Testing Library, consultando por papel e nome acessível                                  |
| frontend | Integração de página | `UsersPage` com a API mockada: filtros, paginação, edição, remoção, vazio e erro         |

- Os testes de componente consultam por papel e nome acessível, então também funcionam como testes de regressão de acessibilidade.
- No frontend, a env de teste define `VITE_API_URL`, e `src/test/setup.ts` fornece `matchMedia`, que o jsdom não implementa.

## Consequências

- Um runner, um estilo de asserção e um provedor de cobertura (`@vitest/coverage-v8`).
- A cobertura é publicada como artefato no CI.
