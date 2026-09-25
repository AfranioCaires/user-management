import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import { makeUser } from '@/test/user.fixture'

import { UsersTable } from './users-table'

const users = [
  makeUser({ id: 1, name: 'Rick Sanchez', status: 'alive', episodes: 2 }),
  makeUser({
    id: 2,
    name: 'Morty Smith',
    status: 'unknown',
    createdAt: '2025-05-05T00:00:00.000Z',
  }),
]

describe('UsersTable', () => {
  test('deve renderizar os cabeçalhos e as linhas formatadas', () => {
    render(<UsersTable users={users} onEdit={vi.fn()} onDelete={vi.fn()} />)

    const headers = screen.getAllByRole('columnheader').map((header) => header.textContent)
    expect(headers).toEqual([
      'Name',
      'Status',
      'Specie',
      'Episodes',
      'Origin',
      'Created at',
      'Actions',
    ])

    const morty = screen.getByRole('row', { name: /Morty Smith/ })
    expect(within(morty).getByText('Unknown')).toBeInTheDocument()
    expect(within(morty).getByText('05/05/2025')).toBeInTheDocument()
  })

  test('deve solicitar a edição no duplo clique', async () => {
    const onEdit = vi.fn()
    render(<UsersTable users={users} onEdit={onEdit} onDelete={vi.fn()} />)

    await userEvent.dblClick(screen.getByRole('rowheader', { name: 'Rick Sanchez' }))

    expect(onEdit).toHaveBeenCalledWith(users[0])
  })

  test('deve expor ações acessíveis de editar e remover em cada linha', async () => {
    const onEdit = vi.fn()
    const onDelete = vi.fn()
    render(<UsersTable users={users} onEdit={onEdit} onDelete={onDelete} />)

    await userEvent.click(screen.getByRole('button', { name: 'Edit Morty Smith' }))
    await userEvent.click(screen.getByRole('button', { name: 'Delete Morty Smith' }))

    expect(onEdit).toHaveBeenCalledWith(users[1])
    expect(onDelete).toHaveBeenCalledWith(users[1])
  })

  test('deve marcar a tabela como ocupada durante a atualização', () => {
    render(<UsersTable users={users} isBusy onEdit={vi.fn()} onDelete={vi.fn()} />)

    expect(screen.getByRole('table')).toHaveAttribute('aria-busy', 'true')
  })
})
