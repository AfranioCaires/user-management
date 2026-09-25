import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import { makeUser } from '@/test/user.fixture'

import { UsersCardList } from './users-card-list'

describe('UsersCardList', () => {
  test('deve renderizar um card por usuário com seus detalhes', () => {
    render(
      <UsersCardList
        users={[makeUser({ id: 1, name: 'Rick Sanchez', origin: 'Mars' })]}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    )

    const card = screen.getByRole('article', { name: 'Rick Sanchez' })
    expect(within(card).getByText('Mars')).toBeInTheDocument()
    expect(within(card).getByText('22/02/2024')).toBeInTheDocument()
  })

  test('deve disparar as ações do card', async () => {
    const user = makeUser()
    const onEdit = vi.fn()
    const onDelete = vi.fn()
    render(<UsersCardList users={[user]} onEdit={onEdit} onDelete={onDelete} />)

    await userEvent.click(screen.getByRole('button', { name: 'Edit Rick Sanchez' }))
    await userEvent.click(screen.getByRole('button', { name: 'Delete Rick Sanchez' }))

    expect(onEdit).toHaveBeenCalledWith(user)
    expect(onDelete).toHaveBeenCalledWith(user)
  })
})
