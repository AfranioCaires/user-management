import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { DataPagination } from './data-pagination'

const meta = {
  title: 'Shared/DataPagination',
  component: DataPagination,
  tags: ['autodocs'],
  args: {
    page: 1,
    totalPages: 450,
    getPageHref: (page: number) => `?page=${page}`,
    onPageChange: () => undefined,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Paginação composta sobre as primitivas `pagination` do shadcn/ui: **First**, seta anterior, uma janela de páginas centrada na atual, seta seguinte e **Last**. Cada item é um link real (`href` vindo de `getPageHref`), então funciona abrir em nova aba; o clique normal é interceptado e chama `onPageChange`, navegando sem recarregar a página. A página atual tem `aria-current="page"` e sublinhado na cor da marca. Nas pontas, os controles ficam desabilitados, sem `href` e com `aria-disabled`.',
      },
    },
  },
  render: function Render(args) {
    const [page, setPage] = useState(args.page)
    return <DataPagination {...args} page={page} onPageChange={setPage} />
  },
} satisfies Meta<typeof DataPagination>

export default meta

type Story = StoryObj<typeof meta>

export const FirstPage: Story = {
  parameters: {
    docs: {
      description: { story: 'Primeira página: navegação para trás desabilitada.' },
    },
  },
}

export const MiddlePage: Story = {
  args: { page: 120 },
  parameters: {
    docs: {
      description: { story: 'No meio da lista, a janela fica centrada na página atual.' },
    },
  },
}

export const LastPage: Story = {
  args: { page: 450 },
  parameters: {
    docs: {
      description: { story: 'Última página: navegação para frente desabilitada.' },
    },
  },
}

export const Compact: Story = {
  args: { windowSize: 5 },
  parameters: {
    docs: {
      description: {
        story: 'Janela de 5 páginas, usada no celular para caber em uma linha.',
      },
    },
  },
}
