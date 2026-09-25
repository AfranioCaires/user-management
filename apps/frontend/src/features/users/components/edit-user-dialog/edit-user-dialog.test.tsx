import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import { makeUser } from '@/test/user.fixture'

import { EditUserDialog } from './edit-user-dialog'

describe('EditUserDialog', () => {
  test('deve preencher o nome atual e enviar o novo', async () => {
    const user = makeUser()
    const onSubmit = vi.fn()
    render(<EditUserDialog user={user} onClose={vi.fn()} onSubmit={onSubmit} />)

    const input = screen.getByRole('textbox', { name: 'Name' })
    expect(input).toHaveValue('Rick Sanchez')

    await userEvent.clear(input)
    await userEvent.type(input, 'Rick Sanchez Edited')
    await userEvent.click(screen.getByRole('button', { name: 'Edit' }))

    expect(onSubmit).toHaveBeenCalledWith(user, 'Rick Sanchez Edited')
  })

  test('deve bloquear um nome vazio e descrever o erro', async () => {
    const onSubmit = vi.fn()
    render(<EditUserDialog user={makeUser()} onClose={vi.fn()} onSubmit={onSubmit} />)

    const input = screen.getByRole('textbox', { name: 'Name' })
    await userEvent.clear(input)
    await userEvent.click(screen.getByRole('button', { name: 'Edit' }))

    expect(onSubmit).not.toHaveBeenCalled()
    expect(input).toHaveAccessibleDescription('Name is required.')
  })

  test('deve fechar ao cancelar', async () => {
    const onClose = vi.fn()
    render(<EditUserDialog user={makeUser()} onClose={onClose} onSubmit={vi.fn()} />)

    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(onClose).toHaveBeenCalledOnce()
  })
})
