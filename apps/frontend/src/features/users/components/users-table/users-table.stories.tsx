import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { usersSample } from '@/features/users/stories/users-sample'

import { UsersTable } from './users-table'

const meta = {
  title: 'Features/Users/UsersTable',
  component: UsersTable,
  tags: ['autodocs'],
  args: { users: usersSample, onEdit: fn(), onDelete: fn() },
  parameters: {
    docs: {
      description: {
        component:
          'Tabela de usuários exibida a partir de 1024 px, com as colunas do Figma: Name, Status, Specie, Episodes, Origin e Created at. No hover, a linha fica cinza e a lixeira aparece; duplo clique na linha abre a edição. Pelo teclado, o botão de editar aparece ao receber foco, e o de remover também, para que as duas ações sejam acessíveis sem mouse. O nome de cada linha é o cabeçalho da linha (`scope="row"`).',
      },
    },
  },
} satisfies Meta<typeof UsersTable>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Página com os mesmos dados do Figma. Passe o mouse sobre uma linha para ver a lixeira.',
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
          'Durante a troca de página, os dados anteriores continuam visíveis, esmaecidos e com `aria-busy`, até a nova página chegar.',
      },
    },
  },
}
