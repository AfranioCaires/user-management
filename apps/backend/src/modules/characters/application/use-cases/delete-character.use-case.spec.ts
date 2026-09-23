import { makeCharacter } from '@test/factories/character.factory'
import { describe, expect, test } from 'vitest'

import { CharacterNotFoundError } from '@/modules/characters/domain/errors/character-not-found.error'
import { InMemoryCharacterRepository } from '@/modules/characters/infrastructure/persistence/in-memory-character.repository'

import { DeleteCharacterUseCase } from './delete-character.use-case'

function setup() {
  const repository = new InMemoryCharacterRepository([makeCharacter({ id: 1 })])
  return { repository, useCase: new DeleteCharacterUseCase(repository) }
}

describe('DeleteCharacterUseCase', () => {
  test('deve remover o personagem', async () => {
    const { repository, useCase } = setup()

    await useCase.execute({ id: 1 })

    expect(await repository.findById(1)).toBeNull()
  })

  test('deve lançar erro quando o personagem não existir', async () => {
    const { useCase } = setup()

    await expect(useCase.execute({ id: 42 })).rejects.toBeInstanceOf(CharacterNotFoundError)
  })
})
