import { makeCharacter } from '@test/factories/character.factory'
import { describe, expect, test } from 'vitest'

import { CharacterNotFoundError } from '@/modules/characters/domain/errors/character-not-found.error'
import { InvalidCharacterNameError } from '@/modules/characters/domain/errors/invalid-character-name.error'
import { InMemoryCharacterRepository } from '@/modules/characters/infrastructure/persistence/in-memory-character.repository'

import { UpdateCharacterNameUseCase } from './update-character-name.use-case'

function setup() {
  const repository = new InMemoryCharacterRepository([makeCharacter({ id: 1 })])
  return { repository, useCase: new UpdateCharacterNameUseCase(repository) }
}

describe('UpdateCharacterNameUseCase', () => {
  test('deve renomear e persistir o personagem', async () => {
    const { repository, useCase } = setup()

    const updated = await useCase.execute({ id: 1, name: 'Rick Sanchez Edited' })
    const persisted = await repository.findById(1)

    expect(updated.name.value).toBe('Rick Sanchez Edited')
    expect(persisted?.name.value).toBe('Rick Sanchez Edited')
  })

  test('deve lançar erro quando o personagem não existir', async () => {
    const { useCase } = setup()

    await expect(useCase.execute({ id: 99, name: 'Morty' })).rejects.toBeInstanceOf(
      CharacterNotFoundError,
    )
  })

  test('deve lançar erro e manter o nome salvo quando o novo nome for inválido', async () => {
    const { repository, useCase } = setup()

    await expect(useCase.execute({ id: 1, name: '  ' })).rejects.toBeInstanceOf(
      InvalidCharacterNameError,
    )
    expect((await repository.findById(1))?.name.value).toBe('Rick Sanchez')
  })
})
