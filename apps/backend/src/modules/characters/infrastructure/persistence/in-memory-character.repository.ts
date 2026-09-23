import { Character } from '@/modules/characters/domain/entities/character'
import {
  CharacterRepository,
  type CharacterSearchCriteria,
} from '@/modules/characters/domain/repositories/character.repository'
import type { PaginatedResult } from '@/shared/domain/paginated-result'

export class InMemoryCharacterRepository extends CharacterRepository {
  private readonly characters = new Map<number, Character>()

  constructor(initialCharacters: readonly Character[] = []) {
    super()
    for (const character of initialCharacters) {
      this.characters.set(character.id, this.clone(character))
    }
  }

  async findMany(criteria: CharacterSearchCriteria): Promise<PaginatedResult<Character>> {
    const name = criteria.name?.trim().toLowerCase()
    const status = criteria.status?.toLowerCase()

    const matches = [...this.characters.values()].filter(
      (character) =>
        (!name || character.name.value.toLowerCase().includes(name)) &&
        (!status || character.status.toLowerCase() === status),
    )

    const start = (criteria.page - 1) * criteria.limit

    return {
      items: matches.slice(start, start + criteria.limit).map((character) => this.clone(character)),
      total: matches.length,
    }
  }

  async findById(id: number): Promise<Character | null> {
    const character = this.characters.get(id)
    return character ? this.clone(character) : null
  }

  async save(character: Character): Promise<void> {
    this.characters.set(character.id, this.clone(character))
  }

  async delete(id: number): Promise<void> {
    this.characters.delete(id)
  }

  private clone(character: Character): Character {
    return Character.restore({
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      type: character.type,
      gender: character.gender,
      origin: character.origin,
      location: character.location,
      image: character.image,
      episode: character.episode,
      url: character.url,
      created: character.created,
    })
  }
}
