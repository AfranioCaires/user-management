import { makeCharacter } from '@test/factories/character.factory'
import { describe, expect, test } from 'vitest'

import { CharacterName } from '@/modules/characters/domain/value-objects/character-name'

describe('Character', () => {
  test('deve expor as propriedades restauradas', () => {
    const character = makeCharacter({ id: 7, name: 'Morty Smith', status: 'Dead' })

    expect(character.id).toBe(7)
    expect(character.name.value).toBe('Morty Smith')
    expect(character.status).toBe('Dead')
    expect(character.origin.name).toBe('Earth')
  })

  test('deve renomear o personagem', () => {
    const character = makeCharacter()

    character.rename(CharacterName.create('Rick Sanchez Edited'))

    expect(character.name.value).toBe('Rick Sanchez Edited')
  })

  test('não deve compartilhar a lista de episódios com as props de origem', () => {
    const episode = ['https://rickandmortyapi.com/api/episode/1']
    const character = makeCharacter({ episode })

    episode.push('https://rickandmortyapi.com/api/episode/2')

    expect(character.episode).toHaveLength(1)
  })
})
