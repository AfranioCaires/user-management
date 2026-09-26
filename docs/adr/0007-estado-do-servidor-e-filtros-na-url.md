# 0007. Estado do servidor no React Query e filtros na URL

## Contexto

A tela lista usuários paginados e filtráveis, e permite alterá-los. Guardar uma cópia dos dados do servidor em estado de componente deixa a lista desatualizada depois das mutações. Guardar os filtros em estado de componente faz com que se percam ao recarregar e quebra o botão voltar.

## Decisão

- **Estado do servidor** fica no React Query. A chave da listagem é `['users', 'list', filters]`, e `keepPreviousData` evita que a tela pisque ao trocar de página. Nesse meio tempo, a tabela fica com `aria-busy`.
- **Mutações** invalidam `['users', 'list']` em caso de sucesso e informam o resultado com toasts (Sonner).
- **Os modais fecham ao confirmar**, antes da mutação, seguindo o fluxo do Figma (modal → toast sobre a tabela).
- **Os filtros** (`page`, `perPage`, `name`, `status`) vivem na URL, lidos por `useUsersFilters` e validados com Zod. Valores padrão são omitidos da URL.
- **A paginação** usa links reais (`?page=N`) com navegação SPA.
- **Ao buscar**, `page` volta para 1. Se uma remoção esvaziar a última página, a tela volta para a nova última página.
- **Erros 4xx** não são refeitos. Erros de rede e de servidor são tentados de novo duas vezes.

## Consequências

- Todo estado da tela pode ser compartilhado e salvo nos favoritos, e a navegação do navegador funciona.
- Não existe store global no cliente. O único estado local é o de interface, como qual modal está aberto.
