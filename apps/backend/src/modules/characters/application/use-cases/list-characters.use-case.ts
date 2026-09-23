import type { CharacterStatus } from '@/modules/characters/domain/character-status'
import type { Character } from '@/modules/characters/domain/entities/character'
import type { CharacterRepository } from '@/modules/characters/domain/repositories/character.repository'

export interface ListCharactersInput {
  readonly page: number
  readonly limit: number
  readonly name?: string
  readonly status?: CharacterStatus
}

export interface ListCharactersOutput {
  readonly items: readonly Character[]
  readonly total: number
  readonly page: number
  readonly limit: number
  readonly pages: number
}

export class ListCharactersUseCase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(input: ListCharactersInput): Promise<ListCharactersOutput> {
    const { items, total } = await this.characterRepository.findMany(input)

    return {
      items,
      total,
      page: input.page,
      limit: input.limit,
      pages: Math.ceil(total / input.limit),
    }
  }
}
