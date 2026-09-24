import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { Pagination, PaginationContent, PaginationItem, PaginationLink } from './pagination'

const meta = {
  title: 'Shared/UI/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Primitivas de paginação do shadcn/ui: `Pagination` (o `<nav>` com nome acessível), `PaginationContent` (a lista), `PaginationItem` e `PaginationLink` (um link com estilo de botão). `isActive` marca a página atual com `aria-current="page"`; `isDisabled` remove o `href` e aplica `aria-disabled`. A tela usa essas peças no componente composto `Shared/DataPagination`, que monta First, setas, janela de páginas e Last.',
      },
    },
  },
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            isDisabled
            aria-label='Previous page'
            size='icon'
            className='aria-disabled:text-disabled'
          >
            <ChevronLeftIcon strokeWidth={2.5} />
          </PaginationLink>
        </PaginationItem>
        {[1, 2, 3].map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`?page=${page}`}
              isActive={page === 1}
              className={
                page === 1
                  ? 'rounded-none border-b-2 border-primary px-0.5 text-foreground'
                  : 'rounded-none border-b-2 border-transparent px-0.5 text-neutral-500'
              }
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink
            href='?page=2'
            aria-label='Next page'
            size='icon'
            className='text-heading'
          >
            <ChevronRightIcon strokeWidth={2.5} />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const Primitives: Story = {
  name: 'Primitivas',
  parameters: {
    docs: {
      description: {
        story: 'Composição mínima: seta anterior desabilitada, três páginas e seta seguinte.',
      },
    },
  },
}
