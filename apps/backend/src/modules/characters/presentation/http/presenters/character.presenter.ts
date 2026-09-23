import type { Character, CharacterLocation } from '@/modules/characters/domain/entities/character'

export interface CharacterResponse {
  readonly id: number
  readonly name: string
  readonly status: string
  readonly species: string
  readonly type: string
  readonly gender: string
  readonly origin: CharacterLocation
  readonly location: CharacterLocation
  readonly image: string
  readonly episode: readonly string[]
  readonly url: string
  readonly created: string
}

export interface CharacterListResponse {
  readonly info: {
    readonly count: number
    readonly pages: number
    readonly next: number | null
    readonly prev: number | null
  }
  readonly results: readonly CharacterResponse[]
}

export interface CharacterListPagination {
  readonly page: number
  readonly pages: number
  readonly total: number
}

export const CharacterPresenter = {
  toResponse(character: Character): CharacterResponse {
    return {
      id: character.id,
      name: character.name.value,
      status: character.status,
      species: character.species,
      type: character.type,
      gender: character.gender,
      origin: character.origin,
      location: character.location,
      image: character.image,
      episode: character.episode,
      url: character.url,
      created: character.created.toISOString(),
    }
  },

  toListResponse(
    characters: readonly Character[],
    pagination: CharacterListPagination,
  ): CharacterListResponse {
    return {
      info: {
        count: pagination.total,
        pages: pagination.pages,
        next: pagination.page < pagination.pages ? pagination.page + 1 : null,
        prev: pagination.page > 1 ? pagination.page - 1 : null,
      },
      results: characters.map((character) => CharacterPresenter.toResponse(character)),
    }
  },
}
