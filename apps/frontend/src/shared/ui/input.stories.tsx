import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from './input'

const meta = {
  title: 'Shared/UI/Input',
  component: Input,
  tags: ['autodocs'],
  args: { 'aria-label': 'Name', placeholder: 'Rick Sanchez' },
  decorators: [
    (Story) => (
      <div className='w-89'>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Campo de texto do shadcn/ui ajustado ao Figma: 36 px de altura, borda `input` (#D9D9D9), cantos de 4 px e texto de 14 px. No foco, a borda e o anel usam a cor da marca. Com `aria-invalid`, borda e anel ficam na cor de erro. Sempre associe um `Label` ou um `aria-label`.',
      },
    },
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: { description: { story: 'Campo vazio com placeholder, como o Name dos filtros.' } },
  },
}

export const Filled: Story = {
  args: { defaultValue: 'Morty Smith' },
  parameters: {
    docs: { description: { story: 'Campo preenchido.' } },
  },
}

export const Invalid: Story = {
  args: { 'aria-invalid': true, defaultValue: '' },
  parameters: {
    docs: {
      description: {
        story: 'Estado de erro, usado quando a validação do formulário falha.',
      },
    },
  },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Rick Sanchez' },
  parameters: {
    docs: { description: { story: 'Campo desabilitado.' } },
  },
}
