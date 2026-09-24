import type { Meta, StoryObj } from '@storybook/react-vite'

import { Separator } from './separator'

const meta = {
  title: 'Shared/UI/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Divisor do shadcn/ui, sobre o Separator do Radix: uma linha de 1 px na cor `border` (#D9D9D9). É decorativo por padrão, então não é anunciado pelo leitor de tela. Na tela, separa o título "User Management" do resto da página.',
      },
    },
  },
  render: (args) => (
    <div className='max-w-3xl'>
      <h1 className='text-2xl leading-8 font-bold text-heading'>User Management</h1>
      <Separator {...args} className='mt-3' />
    </div>
  ),
} satisfies Meta<typeof Separator>

export default meta

type Story = StoryObj<typeof meta>

export const UnderHeading: Story = {
  name: 'Abaixo do título',
  parameters: {
    docs: { description: { story: 'O uso real, logo abaixo do título da página.' } },
  },
}
