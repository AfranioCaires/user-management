import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { usersSample } from '@/features/users/stories/users-sample'

import { UsersCardList } from './users-card-list'

const meta = {
  title: 'Features/Users/UsersCardList',
  component: UsersCardList,
  tags: ['autodocs'],
  args: { users: usersSample.slice(0, 6), onEdit: fn(), onDelete: fn() },
  parameters: {
    docs: {
      description: {
        component:
          'Versão em cards da listagem, usada no lugar da tabela abaixo de 1024 px, onde as seis colunas não cabem. Ocupa toda a largura disponível: uma coluna no celular e duas a partir de 768 px. Cada card mostra os mesmos dados da tabela em uma lista de definição (`<dl>`), e os botões de editar e remover ficam sempre visíveis, porque não existe hover em telas de toque.',
      },
    },
  },
} satisfies Meta<typeof UsersCardList>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Seis usuários na largura disponível. Redimensione o canvas para ver uma ou duas colunas.',
      },
    },
  },
}

export const Refreshing: Story = {
  args: { isBusy: true },
  parameters: {
    docs: {
      description: {
        story:
          'Enquanto a próxima página carrega, a lista atual continua na tela, esmaecida e com `aria-busy`.',
      },
    },
  },
}
