import type { Meta, StoryObj } from '@storybook/react-vite'

import { NativeSelect, NativeSelectOption } from './native-select'

const meta = {
  title: 'Shared/UI/NativeSelect',
  component: NativeSelect,
  tags: ['autodocs'],
  args: { 'aria-label': 'Status', size: 'default' },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['default', 'sm'],
      description: '`default` tem 36 px (filtro Status); `sm` tem 24 px (itens por página).',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Select nativo do shadcn/ui, com a seta desenhada por cima. Usar o `<select>` do navegador garante teclado, leitor de tela e a lista de opções do sistema no celular, sem JavaScript extra. As opções são `NativeSelectOption`. Sempre associe um `Label` ou um `aria-label`.',
      },
    },
  },
  render: (args) => (
    <NativeSelect {...args} className={args.size === 'sm' ? 'w-15' : 'w-60'}>
      {args.size === 'sm' ? (
        <>
          <NativeSelectOption value='10'>10</NativeSelectOption>
          <NativeSelectOption value='15'>15</NativeSelectOption>
          <NativeSelectOption value='20'>20</NativeSelectOption>
          <NativeSelectOption value='50'>50</NativeSelectOption>
        </>
      ) : (
        <>
          <NativeSelectOption value=''>All</NativeSelectOption>
          <NativeSelectOption value='alive'>Alive</NativeSelectOption>
          <NativeSelectOption value='dead'>Dead</NativeSelectOption>
          <NativeSelectOption value='unknown'>Unknown</NativeSelectOption>
        </>
      )}
    </NativeSelect>
  ),
} satisfies Meta<typeof NativeSelect>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: { description: { story: 'O select de Status dos filtros, com 240 px.' } },
  },
}

export const Small: Story = {
  args: { size: 'sm', 'aria-label': 'Results per page', defaultValue: '15' },
  parameters: {
    docs: { description: { story: 'O select de itens por página do rodapé.' } },
  },
}
