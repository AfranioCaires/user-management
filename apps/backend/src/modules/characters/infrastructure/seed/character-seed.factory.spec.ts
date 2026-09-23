import { describe, expect, test } from 'vitest'

import { CHARACTER_STATUSES } from '@/modules/characters/domain/character-status'

import { createCharacterSeed } from './character-seed.factory'

describe('createCharacterSeed', () => {
  test('deve criar a quantidade solicitada de personagens com ids sequenciais', () => {
    const characters = createCharacterSeed({ count: 25, seed: 1 })

    expect(characters).toHaveLength(25)
    expect(characters.map((character) => character.id)).toEqual(
      Array.from({ length: 25 }, (_, index) => index + 1),
    )
  })

  test('deve ser determinístico para a mesma semente', () => {
    const first = createCharacterSeed({ count: 10, seed: 7 }).map((c) => c.name.value)
    const second = createCharacterSeed({ count: 10, seed: 7 }).map((c) => c.name.value)

    expect(first).toEqual(second)
  })

  test('deve gerar apenas status válidos e ao menos um episódio', () => {
    const characters = createCharacterSeed({ count: 200, seed: 3 })

    for (const character of characters) {
      expect(CHARACTER_STATUSES).toContain(character.status)
      expect(character.episode.length).toBeGreaterThan(0)
    }
  })
})
