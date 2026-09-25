import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import { makeUser } from '@/test/user.fixture'

import { DeleteUserDialog } from './delete-user-dialog'

describe('DeleteUserDialog', () => {
  test('deve pedir confirmação citando o nome do usuário', () => {
    render(<DeleteUserDialog user={makeUser()} onClose={vi.fn()} onConfirm={vi.fn()} />)

    expect(screen.getByRole('dialog', { name: 'Delete User' })).toHaveTextContent(
      'Are you sure you want to delete the user “Rick Sanchez”? This action cannot be undone.',
    )
  })

  test('deve confirmar a remoção', async () => {
    const user = makeUser()
    const onConfirm = vi.fn()
    render(<DeleteUserDialog user={user} onClose={vi.fn()} onConfirm={onConfirm} />)

    await userEvent.click(screen.getByRole('button', { name: 'Delete' }))

    expect(onConfirm).toHaveBeenCalledWith(user)
  })

  test('deve fechar ao cancelar', async () => {
    const onClose = vi.fn()
    render(<DeleteUserDialog user={makeUser()} onClose={onClose} onConfirm={vi.fn()} />)

    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(onClose).toHaveBeenCalledOnce()
  })
})
