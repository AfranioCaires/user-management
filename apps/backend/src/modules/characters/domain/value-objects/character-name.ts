import { InvalidCharacterNameError } from '@/modules/characters/domain/errors/invalid-character-name.error'

export class CharacterName {
  static readonly MIN_LENGTH = 1
  static readonly MAX_LENGTH = 100

  private constructor(readonly value: string) {}

  static create(raw: string): CharacterName {
    const normalized = raw.trim().replace(/\s+/g, ' ')

    if (normalized.length < CharacterName.MIN_LENGTH) {
      throw new InvalidCharacterNameError('name must not be empty')
    }

    if (normalized.length > CharacterName.MAX_LENGTH) {
      throw new InvalidCharacterNameError(
        `name must have at most ${CharacterName.MAX_LENGTH} characters`,
      )
    }

    return new CharacterName(normalized)
  }

  equals(other: CharacterName): boolean {
    return this.value === other.value
  }
}
