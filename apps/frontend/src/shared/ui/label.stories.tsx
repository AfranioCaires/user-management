import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from './input'
import { Label } from './label'

const meta = {
  title: 'Shared/UI/Label',
  component: Label,
  tags: ['autodocs'],
  args: { children: 'Name', htmlFor: 'label-story-input' },
  parameters: {
    docs: {
      description: {
        component:
          'Rótulo do shadcn/ui, sobre o Label do Radix: 12 px, na cor de texto padrão, como os rótulos Name e Status do Figma. Ligue-o ao campo com `htmlFor`: clicar no rótulo foca o campo, e o leitor de tela anuncia o nome. Quando o rótulo não deve aparecer, como no campo do modal de edição, use `className="sr-only"`: ele continua acessível.',
      },
    },
  },
  render: (args) => (
    <div className='flex w-89 flex-col gap-1'>
      <Label {...args} />
      <Input id='label-story-input' />
    </div>
  ),
} satisfies Meta<typeof Label>

export default meta

type Story = StoryObj<typeof meta>

export const WithInput: Story = {
  name: 'Com campo',
  parameters: {
    docs: {
      description: { story: 'Rótulo acima do campo, com o respiro de 4 px do Figma.' },
    },
  },
}
