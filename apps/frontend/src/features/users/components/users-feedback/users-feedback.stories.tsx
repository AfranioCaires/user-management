import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { UsersFeedback } from './users-feedback'

const meta = {
  title: 'Features/Users/UsersFeedback',
  component: UsersFeedback,
  tags: ['autodocs'],
  args: { state: 'loading' },
  parameters: {
    docs: {
      description: {
        component:
          'Mensagem exibida no lugar da listagem quando não há usuários para mostrar: carregando, nenhum resultado ou falha na requisição. Carregamento e vazio são anunciados como `status`, com prioridade educada para o leitor de tela; o erro é anunciado como `alert` e oferece **Try again**, que refaz a busca.',
      },
    },
  },
} satisfies Meta<typeof UsersFeedback>

export default meta

type Story = StoryObj<typeof meta>

export const Loading: Story = {
  parameters: {
    docs: { description: { story: 'Primeira carga da página, antes de a API responder.' } },
  },
}

export const Empty: Story = {
  args: { state: 'empty' },
  parameters: {
    docs: { description: { story: 'Nenhum usuário corresponde aos filtros aplicados.' } },
  },
}

export const ErrorState: Story = {
  name: 'Error',
  args: { state: 'error', onRetry: fn() },
  parameters: {
    docs: {
      description: { story: 'A API falhou ou está fora do ar. O botão tenta novamente.' },
    },
  },
}
