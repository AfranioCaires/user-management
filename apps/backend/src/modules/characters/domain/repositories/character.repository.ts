import type { CharacterStatus } from '@/modules/characters/domain/character-status'
import type { Character } from '@/modules/characters/domain/entities/character'
import type { PaginatedResult } from '@/shared/domain/paginated-result'

export interface CharacterSearchCriteria {
  readonly name?: string
  readonly status?: CharacterStatus
  readonly page: number
  readonly limit: number
}

export abstract class CharacterRepository {
  abstract findMany(criteria: CharacterSearchCriteria): Promise<PaginatedResult<Character>>

  abstract findById(id: number): Promise<Character | null>

  abstract save(character: Character): Promise<void>

  abstract delete(id: number): Promise<void>
}
