# 0006. Validação com Zod em todas as fronteiras

## Contexto

Os dados cruzam várias fronteiras de confiança: do navegador para o backend, do backend para o navegador, da URL para o estado e do ambiente para a configuração. Tipos TypeScript desaparecem em runtime, então anotar o tipo de uma resposta é só uma promessa. `any` é proibido no código.

## Decisão

Schemas Zod protegem cada fronteira, e os tipos inferidos deles são a única fonte da verdade:

| Fronteira                          | Onde fica o schema                                                                                                                         |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Entrada HTTP no backend            | `presentation/http/schemas`, passado em `@Query/@Param/@Body({ schema })` e validado pelo `StandardSchemaValidationPipe` nativo do Nest 12 |
| Resposta da API lida pelo frontend | `features/users/api/character.schemas.ts`, que valida e já converte para `User`                                                            |
| Parâmetros da URL                  | `features/users/model/users-filters.ts`, com fallback para valores válidos                                                                 |
| Formulários                        | `edit-user-form.ts` e `users-filters-form.ts`, via `@hookform/resolvers`                                                                   |
| Variáveis de ambiente              | `config/env.ts` em cada app                                                                                                                |

- No backend, o Zod 4 implementa o Standard Schema, então não há pipe próprio: o `StandardSchemaValidationPipe` é registrado como `APP_PIPE`, com um `exceptionFactory` que mantém o formato de erro da API (`VALIDATION_FAILED` e a lista de `issues` com `path` e `message`).
- As chamadas HTTP são tipadas como `unknown` e só viram dados tipados depois do parse.
- As variáveis de ambiente não têm valor padrão no código: `PORT`, `CORS_ORIGIN` e `VITE_API_URL` são obrigatórias, e a aplicação não sobe sem elas. Todas estão no `.env.example` de cada app.

## Consequências

- Um desvio de contrato falha de forma explícita na borda, como estado de erro na tela, e nunca corrompe a interface.
- Os tipos não podem divergir da validação.
- Uma configuração ausente quebra na inicialização, e não em produção no meio de uma requisição.
