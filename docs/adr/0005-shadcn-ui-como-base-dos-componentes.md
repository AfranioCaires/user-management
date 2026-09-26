# 0005. shadcn/ui como base dos componentes

## Contexto

A tela precisa de botões, campos, select, tabela, modal, paginação e toasts acessíveis. Escrever esses primitivos do zero exige cuidar de foco, teclado e ARIA, o que já está resolvido em bibliotecas maduras. Ao mesmo tempo, o visual precisa seguir o Figma à risca, com as cores exatas.

## Decisão

O frontend usa shadcn/ui, configurado e mantido pelo CLI oficial.

- **Configuração**: o projeto foi iniciado com `shadcn init` (base Radix, preset `nova`). O `components.json` aponta os aliases para a estrutura por features: `ui → @/shared/ui`, `components → @/shared/components`, `lib → @/shared/lib`, `hooks → @/shared/hooks`.
- **Componentes**: foram adicionados com `shadcn add` apenas os usados na tela: `button`, `input`, `label`, `native-select`, `table`, `dialog`, `pagination`, `separator` e `sonner`.
- **Dependências reais**: `radix-ui` (primitivos acessíveis), `class-variance-authority` (variantes), `cn` (merge de classes do shadcn, substituto de clsx + tailwind-merge), `sonner` (toasts) e `tw-animate-css`.
- **Customização**: os componentes gerados passam a ser código do projeto, como o shadcn prevê. Os tokens em `src/styles/index.css` (`--primary`, `--destructive`, `--border`, `--muted` etc.) recebem as cores do Figma. As variantes e tamanhos foram ajustados às medidas do design (controles de 36 px, raios, pesos de fonte). Variantes que a tela não usa foram removidas.
- **Composição**: `DataPagination` (em `shared/components`) monta First, anterior, páginas, próxima e Last sobre as primitivas de `pagination`, com links reais (`href`) e navegação SPA.
- **Acessibilidade** que vem dos primitivos: o Dialog do Radix prende o foco, fecha com Esc e devolve o foco ao gatilho. O Sonner anuncia os toasts em uma região `aria-live`.

## Consequências

- Os componentes são acessíveis por padrão e continuam totalmente sob controle do projeto.
- Novos componentes entram com `pnpm dlx shadcn@latest add <nome>`, já nos aliases corretos.
- Atualizações do registry do shadcn não chegam sozinhas. É preciso reaplicá-las manualmente, se fizer sentido.
