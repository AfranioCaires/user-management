import { makeCharacter } from '@test/factories/character.factory'
import { describe, expect, test } from 'vitest'

import { InMemoryCharacterRepository } from '@/modules/characters/infrastructure/persistence/in-memory-character.repository'

import { ListCharactersUseCase } from './list-characters.use-case'

function setup() {
  const repository = new InMemoryCharacterRepository([
    makeCharacter({ id: 1, name: 'Rick Sanchez', status: 'Alive' }),
    makeCharacter({ id: 2, name: 'Morty Smith', status: 'Alive' }),
    makeCharacter({ id: 3, name: 'Rick Prime', status: 'Dead' }),
  ])
  return { useCase: new ListCharactersUseCase(repository) }
}

describe('ListCharactersUseCase', () => {
  test('deve retornar a página solicitada com os metadados de paginação', async () => {
    const { useCase } = setup()

    const result = await useCase.execute({ page: 2, limit: 2 })

    expect(result.items.map((character) => character.id)).toEqual([3])
    expect(result).toMatchObject({ total: 3, page: 2, limit: 2, pages: 2 })
  })

  test('deve filtrar por nome e status', async () => {
    const { useCase } = setup()

    const result = await useCase.execute({ page: 1, limit: 10, name: 'rick', status: 'Dead' })

    expect(result.items.map((character) => character.name.value)).toEqual(['Rick Prime'])
    expect(result.total).toBe(1)
  })

  test('deve retornar zero páginas quando nada corresponder', async () => {
    const { useCase } = setup()

    const result = await useCase.execute({ page: 1, limit: 10, name: 'Birdperson' })

    expect(result).toMatchObject({ items: [], total: 0, pages: 0 })
  })
})
