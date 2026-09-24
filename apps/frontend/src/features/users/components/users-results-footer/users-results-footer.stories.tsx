import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { UsersResultsFooter } from './users-results-footer'

const meta = {
  title: 'Features/Users/UsersResultsFooter',
  component: UsersResultsFooter,
  tags: ['autodocs'],
  args: {
    page: 4,
    perPage: 15,
    total: 6748,
    totalPages: 450,
    getPageHref: (page: number) => `?page=${page}`,
    onPageChange: fn(),
    onPerPageChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          'Rodapé da listagem, em três partes: à esquerda, o intervalo exibido ("Showing results 46-60 of 6748"), anunciado como `status` a cada troca; no centro, a paginação (8 páginas no desktop, 5 no celular); à direita, o seletor de itens por página (10, 15, 20 ou 50). A partir de 1024 px fica em uma linha; abaixo disso, empilhado e centralizado.',
      },
    },
  },
} satisfies Meta<typeof UsersResultsFooter>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: 'Página 4 de 450, com 15 itens por página, como no Figma.' },
    },
  },
}

export const FirstPage: Story = {
  args: { page: 1 },
  parameters: {
    docs: {
      description: {
        story: 'Na primeira página, "First" e a seta para trás ficam desabilitados.',
      },
    },
  },
}
