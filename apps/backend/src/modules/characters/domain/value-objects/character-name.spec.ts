import { describe, expect, test } from 'vitest'

import { InvalidCharacterNameError } from '@/modules/characters/domain/errors/invalid-character-name.error'

import { CharacterName } from './character-name'

describe('CharacterName', () => {
  test('deve remover espaços nas pontas e colapsar espaços internos', () => {
    expect(CharacterName.create('  Rick   Sanchez  ').value).toBe('Rick Sanchez')
  })

  test('deve rejeitar um nome vazio', () => {
    expect(() => CharacterName.create('   ')).toThrow(InvalidCharacterNameError)
  })

  test('deve rejeitar um nome maior que o tamanho máximo', () => {
    const tooLong = 'a'.repeat(CharacterName.MAX_LENGTH + 1)
    expect(() => CharacterName.create(tooLong)).toThrow(InvalidCharacterNameError)
  })

  test('deve aceitar um nome com exatamente o tamanho máximo', () => {
    const name = 'a'.repeat(CharacterName.MAX_LENGTH)
    expect(CharacterName.create(name).value).toBe(name)
  })

  test('deve comparar nomes pelo valor', () => {
    expect(CharacterName.create('Morty').equals(CharacterName.create(' Morty '))).toBe(true)
    expect(CharacterName.create('Morty').equals(CharacterName.create('Rick'))).toBe(false)
  })
})
