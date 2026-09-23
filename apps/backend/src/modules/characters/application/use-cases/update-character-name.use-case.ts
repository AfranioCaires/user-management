import type { Character } from '@/modules/characters/domain/entities/character'
import { CharacterNotFoundError } from '@/modules/characters/domain/errors/character-not-found.error'
import type { CharacterRepository } from '@/modules/characters/domain/repositories/character.repository'
import { CharacterName } from '@/modules/characters/domain/value-objects/character-name'

export interface UpdateCharacterNameInput {
  readonly id: number
  readonly name: string
}

export class UpdateCharacterNameUseCase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(input: UpdateCharacterNameInput): Promise<Character> {
    const character = await this.characterRepository.findById(input.id)

    if (!character) {
      throw new CharacterNotFoundError(input.id)
    }

    character.rename(CharacterName.create(input.name))
    await this.characterRepository.save(character)

    return character
  }
}
