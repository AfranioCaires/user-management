import { makeCharacter } from '@test/factories/character.factory'
import { describe, expect, test } from 'vitest'

import { CharacterName } from '@/modules/characters/domain/value-objects/character-name'

import { InMemoryCharacterRepository } from './in-memory-character.repository'

describe('InMemoryCharacterRepository', () => {
  test('deve buscar nomes por trecho sem diferenciar maiúsculas', async () => {
    const repository = new InMemoryCharacterRepository([
      makeCharacter({ id: 1, name: 'Rick Sanchez' }),
      makeCharacter({ id: 2, name: 'Morty Smith' }),
    ])

    const result = await repository.findMany({ page: 1, limit: 10, name: '  SANCH ' })

    expect(result.items.map((character) => character.id)).toEqual([1])
  })

  test('deve filtrar por status', async () => {
    const repository = new InMemoryCharacterRepository([
      makeCharacter({ id: 1, status: 'Alive' }),
      makeCharacter({ id: 2, status: 'unknown' }),
    ])

    const result = await repository.findMany({ page: 1, limit: 10, status: 'unknown' })

    expect(result.items.map((character) => character.id)).toEqual([2])
  })

  test('não deve vazar alterações não salvas para o armazenamento', async () => {
    const repository = new InMemoryCharacterRepository([makeCharacter({ id: 1 })])
    const character = await repository.findById(1)

    character?.rename(CharacterName.create('Unsaved'))

    expect((await repository.findById(1))?.name.value).toBe('Rick Sanchez')
  })

  test('deve remover um personagem', async () => {
    const repository = new InMemoryCharacterRepository([makeCharacter({ id: 1 })])

    await repository.delete(1)

    expect(await repository.findMany({ page: 1, limit: 10 })).toEqual({ items: [], total: 0 })
  })
})
