import { describe, expect, test } from 'vitest'

import { DEFAULT_PER_PAGE, parseUsersFilters, serializeUsersFilters } from './users-filters'

describe('parseUsersFilters', () => {
  test('deve aplicar os valores padrão quando não houver parâmetros', () => {
    expect(parseUsersFilters(new URLSearchParams())).toEqual({
      page: 1,
      perPage: DEFAULT_PER_PAGE,
      name: '',
      status: undefined,
    })
  })

  test('deve interpretar parâmetros válidos', () => {
    const params = new URLSearchParams('page=3&perPage=50&name=rick&status=dead')

    expect(parseUsersFilters(params)).toEqual({
      page: 3,
      perPage: 50,
      name: 'rick',
      status: 'dead',
    })
  })

  test('deve usar os valores padrão para parâmetros inválidos', () => {
    const params = new URLSearchParams('page=-2&perPage=7&status=zombie')

    expect(parseUsersFilters(params)).toMatchObject({
      page: 1,
      perPage: DEFAULT_PER_PAGE,
      status: undefined,
    })
  })
})

describe('serializeUsersFilters', () => {
  test('deve omitir os valores padrão', () => {
    const params = serializeUsersFilters({
      page: 1,
      perPage: DEFAULT_PER_PAGE,
      name: '',
      status: undefined,
    })

    expect(params.toString()).toBe('')
  })

  test('deve manter os valores diferentes do padrão', () => {
    const params = serializeUsersFilters({ page: 2, perPage: 20, name: 'morty', status: 'alive' })

    expect(params.toString()).toBe('page=2&perPage=20&name=morty&status=alive')
  })
})
