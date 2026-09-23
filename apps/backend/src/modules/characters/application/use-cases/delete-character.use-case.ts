import { CharacterNotFoundError } from '@/modules/characters/domain/errors/character-not-found.error'
import type { CharacterRepository } from '@/modules/characters/domain/repositories/character.repository'

export interface DeleteCharacterInput {
  readonly id: number
}

export class DeleteCharacterUseCase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(input: DeleteCharacterInput): Promise<void> {
    const character = await this.characterRepository.findById(input.id)

    if (!character) {
      throw new CharacterNotFoundError(input.id)
    }

    await this.characterRepository.delete(character.id)
  }
}
