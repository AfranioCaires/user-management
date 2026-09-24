import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { UsersFilters } from './users-filters'

const meta = {
  title: 'Features/Users/UsersFilters',
  component: UsersFilters,
  tags: ['autodocs'],
  args: { name: '', status: undefined, onSubmit: fn() },
  parameters: {
    docs: {
      description: {
        component:
          'Formulário de busca da tela: campo **Name** (busca por trecho, sem diferenciar maiúsculas), select **Status** (All, Alive, Dead, Unknown) e botão **Search**. Os valores vêm da URL por props e, ao enviar, `onSubmit` recebe `{ name, status }`; a página grava esses filtros na URL e volta para a página 1. Fica envolvido em um landmark `<search>`, com os campos em linha no desktop e empilhados no celular.',
      },
    },
  },
} satisfies Meta<typeof UsersFilters>

export default meta

type Story = StoryObj<typeof meta>

export const Empty: Story = {
  parameters: {
    docs: { description: { story: 'Estado inicial do Figma, sem filtros aplicados.' } },
  },
}

export const Filled: Story = {
  args: { name: 'Rick', status: 'dead' },
  parameters: {
    docs: {
      description: {
        story: 'Filtros vindos da URL, como em `?name=Rick&status=dead`, já refletidos nos campos.',
      },
    },
  },
}
