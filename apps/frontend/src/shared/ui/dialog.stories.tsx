import type { Meta, StoryObj } from '@storybook/react-vite'
import { TriangleAlertIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from './button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog'

const meta = {
  title: 'Shared/UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      story: { inline: false, iframeHeight: 360 },
      description: {
        component:
          'Modal do shadcn/ui, sobre o Dialog do Radix, ajustado ao Figma: 444 px de largura, 24 px de respiro, título de 20 px em negrito, fundo escurecido em `black/40` e rodapé com divisor, ação secundária à esquerda e principal à direita. Composto por `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription` e `DialogFooter`. Prende o foco, fecha com Esc e ao clicar fora, e devolve o foco ao elemento que o abriu. `DialogTitle` dá o nome acessível ao modal e `DialogDescription` a descrição; sem descrição, passe `aria-describedby={undefined}` ao `DialogContent`.',
      },
    },
  },
  render: function Render() {
    const [open, setOpen] = useState(true)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <TriangleAlertIcon aria-hidden='true' className='size-5 text-destructive' />
              <DialogTitle>Delete User</DialogTitle>
            </DialogHeader>
            <DialogDescription className='mt-9'>
              Are you sure you want to delete the user “Rick Sanchez”? This action cannot be undone.
            </DialogDescription>
            <DialogFooter>
              <Button variant='link' size='inline' onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant='destructive' onClick={() => setOpen(false)}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  },
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Composição completa, aberta ao carregar. Feche e use o botão para abrir de novo.',
      },
    },
  },
}
