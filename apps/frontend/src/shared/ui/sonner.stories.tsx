import type { Meta, StoryObj } from '@storybook/react-vite'
import { toast } from 'sonner'

import { Button } from './button'
import { Toaster } from './sonner'

const meta = {
  title: 'Shared/UI/Toaster',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 240 },
      description: {
        component:
          'Toasts do shadcn/ui, sobre o Sonner, no estilo do Figma: canto superior direito, 48 px de altura, ícone à esquerda, verde para sucesso e vermelho para erro. O `Toaster` é montado uma vez no `AppProviders`; em qualquer lugar, `toast.success(...)` e `toast.error(...)` exibem a mensagem. Cada toast some depois de 5 segundos e é anunciado ao leitor de tela por uma região `aria-live`.',
      },
    },
  },
  render: () => (
    <div className='flex gap-4 p-6'>
      <Button onClick={() => toast.success('User successfully deleted.')}>Show success</Button>
      <Button variant='destructive' onClick={() => toast.error('Error deleting user.')}>
        Show error
      </Button>
      <Toaster />
    </div>
  ),
} satisfies Meta<typeof Toaster>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: 'Clique nos botões para ver os toasts de sucesso e de erro.' },
    },
  },
}
