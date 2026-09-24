import { beforeEach, describe, expect, test, vi } from 'vitest'
import { ZodError } from 'zod'

import { deleteUser, fetchUsers, updateUserName } from '@/features/users/api/users.api'
import { httpClient } from '@/shared/lib/http-client'

vi.mock('@/shared/lib/http-client', () => ({
  httpClient: { get: vi.fn(), patch: vi.fn(), delete: vi.fn() },
}))

const http = vi.mocked(httpClient)

const apiCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Earth', url: '' },
  image: '',
  episode: ['e1', 'e2'],
  url: '',
  created: '2024-02-22T00:00:00.000Z',
}

describe('users api', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('deve buscar personagens enviando os filtros e mapear para usuários', async () => {
    http.get.mockResolvedValue({
      data: { info: { count: 16, pages: 2, next: 2, prev: null }, results: [apiCharacter] },
    })

    const page = await fetchUsers({ page: 2, perPage: 15, name: '', status: 'dead' })

    expect(http.get).toHaveBeenCalledWith('/characters', {
      params: { page: 2, limit: 15, name: undefined, status: 'dead' },
      signal: undefined,
    })
    expect(page).toEqual({
      data: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'alive',
          species: 'Human',
          episodes: 2,
          origin: 'Earth',
          createdAt: '2024-02-22T00:00:00.000Z',
        },
      ],
      meta: { page: 2, perPage: 15, total: 16, totalPages: 2 },
    })
  })

  test('deve rejeitar uma resposta fora do contrato', async () => {
    http.get.mockResolvedValue({ data: { results: 'invalid' } })

    await expect(fetchUsers({ page: 1, perPage: 15, name: '' })).rejects.toThrow(ZodError)
  })

  test('deve atualizar o nome e mapear o usuário retornado', async () => {
    http.patch.mockResolvedValue({
      data: { ...apiCharacter, name: 'Rick Edited', status: 'unknown' },
    })

    const user = await updateUserName(1, 'Rick Edited')

    expect(http.patch).toHaveBeenCalledWith('/characters/1', { name: 'Rick Edited' })
    expect(user).toMatchObject({ name: 'Rick Edited', status: 'unknown' })
  })

  test('deve remover o usuário', async () => {
    http.delete.mockResolvedValue({ data: undefined })

    await deleteUser(7)

    expect(http.delete).toHaveBeenCalledWith('/characters/7')
  })
})
