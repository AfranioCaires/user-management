import type { Meta, StoryObj } from '@storybook/react-vite'
import { Trash2Icon } from 'lucide-react'
import { fn } from 'storybook/test'

import { Button } from './button'

const meta = {
  title: 'Shared/UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Search', onClick: fn() },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['default', 'destructive', 'secondary', 'ghost', 'link'],
      description: 'Estilo visual do botão.',
    },
    size: {
      control: 'inline-radio',
      options: ['default', 'inline', 'icon', 'icon-sm'],
      description: 'Tamanho. `default` tem 36 px de altura, como os botões do Figma.',
    },
    asChild: {
      control: 'boolean',
      description:
        'Aplica o estilo ao elemento filho, como um link, em vez de renderizar um `<button>`.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Botão do shadcn/ui ajustado ao Figma. Variantes: `default` (Search, Edit), `destructive` (Delete), `link` (Cancel), `secondary` (botões redondos de ação da linha da tabela) e `ghost` (base dos links da paginação). O `type` padrão é `button`, para não enviar formulários sem querer.',
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  parameters: {
    docs: {
      description: { story: 'Ação principal, como o Search dos filtros e o Edit do modal.' },
    },
  },
}

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Delete' },
  parameters: {
    docs: {
      description: { story: 'Confirmação de ação irreversível, como no modal de remoção.' },
    },
  },
}

export const Link: Story = {
  args: { variant: 'link', size: 'inline', children: 'Cancel' },
  parameters: {
    docs: {
      description: { story: 'Ação secundária em forma de texto, como o Cancel dos modais.' },
    },
  },
}

export const RowAction: Story = {
  args: {
    variant: 'secondary',
    size: 'icon-sm',
    'aria-label': 'Delete Rick Sanchez',
    children: <Trash2Icon aria-hidden='true' />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Botão redondo de 28 px da linha da tabela. Por ter só um ícone, precisa de `aria-label`.',
      },
    },
  },
}
