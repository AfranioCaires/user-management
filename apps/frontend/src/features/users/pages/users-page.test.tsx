import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { deleteUser, fetchUsers, updateUserName } from '@/features/users/api/users.api'
import { renderWithProviders } from '@/test/render-with-providers'
import { makeUser, makeUsersPage } from '@/test/user.fixture'

import { UsersPage } from './users-page'

vi.mock('@/features/users/api/users.api', () => ({
  fetchUsers: vi.fn(),
  updateUserName: vi.fn(),
  deleteUser: vi.fn(),
}))

const api = {
  fetchUsers: vi.mocked(fetchUsers),
  updateUserName: vi.mocked(updateUserName),
  deleteUser: vi.mocked(deleteUser),
}

const rick = makeUser({ id: 1, name: 'Rick Sanchez' })
const morty = makeUser({ id: 2, name: 'Morty Smith', status: 'dead' })

describe('UsersPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    api.fetchUsers.mockResolvedValue(
      makeUsersPage([rick, morty], { total: 32, totalPages: 3, perPage: 15 }),
    )
  })

  test('deve renderizar o título e os usuários retornados pela API', async () => {
    renderWithProviders(<UsersPage />)

    expect(screen.getByRole('heading', { level: 1, name: 'User Management' })).toBeInTheDocument()
    expect(await screen.findByRole('rowheader', { name: 'Rick Sanchez' })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('1-15 of 32')
  })

  test('deve ler os filtros iniciais da URL', async () => {
    renderWithProviders(<UsersPage />, { initialEntry: '/?page=2&name=rick&status=dead' })

    await screen.findByRole('rowheader', { name: 'Rick Sanchez' })

    expect(api.fetchUsers).toHaveBeenCalledWith(
      { page: 2, perPage: 15, name: 'rick', status: 'dead' },
      expect.any(AbortSignal),
    )
  })

  test('deve buscar com os filtros enviados e voltar para a primeira página', async () => {
    const { router } = renderWithProviders(<UsersPage />, { initialEntry: '/?page=3' })
    await screen.findByRole('rowheader', { name: 'Rick Sanchez' })

    await userEvent.type(screen.getByRole('searchbox', { name: 'Name' }), 'morty')
    await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Status' }), 'dead')
    await userEvent.click(screen.getByRole('button', { name: 'Search' }))

    await waitFor(() => expect(router.state.location.search).toBe('?name=morty&status=dead'))
    await waitFor(() =>
      expect(api.fetchUsers).toHaveBeenLastCalledWith(
        { page: 1, perPage: 15, name: 'morty', status: 'dead' },
        expect.any(AbortSignal),
      ),
    )
  })

  test('deve navegar entre as páginas', async () => {
    const { router } = renderWithProviders(<UsersPage />)
    await screen.findByRole('rowheader', { name: 'Rick Sanchez' })

    await userEvent.click(screen.getByRole('link', { name: 'Page 2' }))

    await waitFor(() => expect(router.state.location.search).toBe('?page=2'))
  })

  test('deve editar o nome de um usuário e confirmar com um toast', async () => {
    api.updateUserName.mockResolvedValue({ ...rick, name: 'Rick Sanchez Edited' })
    renderWithProviders(<UsersPage />)

    await userEvent.dblClick(await screen.findByRole('rowheader', { name: 'Rick Sanchez' }))
    const dialog = screen.getByRole('dialog', { name: 'Edit User' })
    const input = within(dialog).getByRole('textbox', { name: 'Name' })
    await userEvent.clear(input)
    await userEvent.type(input, 'Rick Sanchez Edited')
    await userEvent.click(within(dialog).getByRole('button', { name: 'Edit' }))

    expect(api.updateUserName).toHaveBeenCalledWith(1, 'Rick Sanchez Edited')
    expect(await screen.findByText('User successfully edited.')).toBeInTheDocument()
    await waitFor(() => expect(api.fetchUsers).toHaveBeenCalledTimes(2))
  })

  test('deve exibir um toast de erro quando a edição falhar', async () => {
    api.updateUserName.mockRejectedValue(new Error('boom'))
    renderWithProviders(<UsersPage />)

    await screen.findByRole('rowheader', { name: 'Morty Smith' })
    await userEvent.click(
      within(screen.getByRole('table')).getByRole('button', { name: 'Edit Morty Smith' }),
    )
    await userEvent.click(screen.getByRole('button', { name: 'Edit' }))

    expect(await screen.findByText('Error editing user.')).toBeInTheDocument()
  })

  test('deve remover um usuário após a confirmação', async () => {
    api.deleteUser.mockResolvedValue(undefined)
    renderWithProviders(<UsersPage />)

    await screen.findByRole('table')
    await userEvent.click(
      within(screen.getByRole('table')).getByRole('button', { name: 'Delete Morty Smith' }),
    )
    await userEvent.click(
      within(screen.getByRole('dialog', { name: 'Delete User' })).getByRole('button', {
        name: 'Delete',
      }),
    )

    expect(api.deleteUser).toHaveBeenCalledWith(2)
    expect(await screen.findByText('User successfully deleted.')).toBeInTheDocument()
  })

  test('deve exibir um toast de erro quando a remoção falhar', async () => {
    api.deleteUser.mockRejectedValue(new Error('boom'))
    renderWithProviders(<UsersPage />)

    await screen.findByRole('table')
    await userEvent.click(
      within(screen.getByRole('table')).getByRole('button', { name: 'Delete Rick Sanchez' }),
    )
    await userEvent.click(
      within(screen.getByRole('dialog', { name: 'Delete User' })).getByRole('button', {
        name: 'Delete',
      }),
    )

    expect(await screen.findByText('Error deleting user.')).toBeInTheDocument()
  })

  test('deve exibir o estado vazio quando nenhum usuário corresponder', async () => {
    api.fetchUsers.mockResolvedValue(makeUsersPage([], { total: 0, totalPages: 0 }))
    renderWithProviders(<UsersPage />)

    expect(await screen.findByText('No users found.')).toBeInTheDocument()
    expect(screen.queryByRole('navigation', { name: 'Pagination' })).not.toBeInTheDocument()
  })

  test('deve exibir o estado de erro e tentar novamente', async () => {
    api.fetchUsers.mockRejectedValueOnce(new Error('network'))
    renderWithProviders(<UsersPage />)

    await userEvent.click(await screen.findByRole('button', { name: 'Try again' }))

    expect(await screen.findByRole('rowheader', { name: 'Rick Sanchez' })).toBeInTheDocument()
  })

  test('deve voltar para a última página quando a página atual deixar de existir', async () => {
    const { router } = renderWithProviders(<UsersPage />, { initialEntry: '/?page=9' })

    await waitFor(() => expect(router.state.location.search).toBe('?page=3'))
  })
})
