import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { fn } from 'storybook/test'

import type { User } from '@/features/users/model/user'
import { usersSample } from '@/features/users/stories/users-sample'
import { Button } from '@/shared/ui/button'

import { DeleteUserDialog } from './delete-user-dialog'

const meta = {
  title: 'Features/Users/DeleteUserDialog',
  component: DeleteUserDialog,
  tags: ['autodocs'],
  args: { user: usersSample[0] ?? null, onClose: fn(), onConfirm: fn() },
  parameters: {
    layout: 'centered',
    docs: {
      story: { inline: false, iframeHeight: 360 },
      description: {
        component:
          'Modal de confirmação exibido ao clicar na lixeira de uma linha. Mostra o nome do usuário na pergunta e oferece **Cancel** (fecha sem alterar nada) e **Delete** (dispara `onConfirm`). É um Dialog do Radix: prende o foco, fecha com Esc e devolve o foco ao botão que o abriu. O modal fica aberto enquanto `user` não for `null`.',
      },
    },
  },
  render: function Render(args) {
    const [user, setUser] = useState<User | null>(args.user)
    return (
      <>
        <Button variant='destructive' onClick={() => setUser(args.user)}>
          Open delete dialog
        </Button>
        <DeleteUserDialog
          user={user}
          onClose={() => {
            args.onClose()
            setUser(null)
          }}
          onConfirm={(confirmed) => {
            args.onConfirm(confirmed)
            setUser(null)
          }}
        />
      </>
    )
  },
} satisfies Meta<typeof DeleteUserDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Open: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Estado do Figma: o modal já aberto para "Rick Sanchez". Feche e use o botão para abri-lo de novo.',
      },
    },
  },
}
