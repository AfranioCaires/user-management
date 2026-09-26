# 0004. Frontend organizado por features, com camada de layouts

## Contexto

Agrupar arquivos por tipo técnico (todos os componentes juntos, todos os hooks juntos) espalha uma feature pela árvore e esconde seus limites. A tela também precisa de uma moldura de página (landmark `main`, skip link, largura máxima e respiros laterais) que as páginas não deveriam reimplementar.

## Decisão

`apps/frontend/src` é organizado assim:

```
app/          raiz de composição: providers, router, App
layouts/      molduras de página renderizadas pelo router (MainLayout renderiza <Outlet />)
features/     uma pasta por feature
  users/
    api/          chamadas HTTP, contrato da API (Zod) e query keys
    model/        tipos, schemas de formulário, funções puras (filtros, rótulos)
    hooks/        hooks de React Query e de estado na URL
    components/   componentes de apresentação, cada um com teste e story
    pages/        containers de rota que ligam hooks a componentes
shared/       código que não pertence a nenhuma feature
  ui/           componentes do shadcn/ui, customizados com os tokens do Figma
  components/   componentes compostos reutilizáveis (DataPagination)
  lib/          utilitários puros
  hooks/        hooks genéricos
  config/       variáveis de ambiente validadas
```

Regras:

- `shared` nunca importa de `features`, e uma feature nunca importa de outra.
- Todos os imports usam o alias `@/`, nunca caminhos relativos para cima (`../`).
- Componentes são de apresentação: recebem dados e callbacks. Só as `pages` usam hooks. Isso os mantém fáceis de testar e prontos para o Storybook.
- Só existem os componentes que são de fato renderizados.

## Consequências

- Remover uma feature é remover uma pasta.
- A camada de layouts mantém landmarks e respiros consistentes entre as rotas.
