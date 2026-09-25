import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { fn } from 'storybook/test'

import type { User } from '@/features/users/model/user'
import { usersSample } from '@/features/users/stories/users-sample'
import { Button } from '@/shared/ui/button'

import { EditUserDialog } from './edit-user-dialog'

const meta = {
  title: 'Features/Users/EditUserDialog',
  component: EditUserDialog,
  tags: ['autodocs'],
  args: { user: usersSample[0] ?? null, onClose: fn(), onSubmit: fn() },
  parameters: {
    layout: 'centered',
    docs: {
      story: { inline: false, iframeHeight: 360 },
      description: {
        component:
          'Modal de edição aberto com duplo clique na linha, ou pelo botão de editar no teclado e no mobile. O campo vem preenchido com o nome atual e é validado com Zod (obrigatório, até 100 caracteres). Um nome vazio mostra o erro abaixo do campo, ligado por `aria-describedby`. **Edit** envia o formulário e chama `onSubmit(user, name)`; **Cancel** fecha sem alterar nada.',
      },
    },
  },
  render: function Render(args) {
    const [user, setUser] = useState<User | null>(args.user)
    return (
      <>
        <Button onClick={() => setUser(args.user)}>Open edit dialog</Button>
        <EditUserDialog
          user={user}
          onClose={() => {
            args.onClose()
            setUser(null)
          }}
          onSubmit={(edited, name) => {
            args.onSubmit(edited, name)
            setUser(null)
          }}
        />
      </>
    )
  },
} satisfies Meta<typeof EditUserDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Open: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Estado do Figma: o modal aberto com "Rick Sanchez". Apague o nome e clique em Edit para ver o erro de validação.',
      },
    },
  },
}
