import { CHARACTER_STATUSES } from '@/modules/characters/domain/character-status'
import { Character, type CharacterLocation } from '@/modules/characters/domain/entities/character'
import { CharacterName } from '@/modules/characters/domain/value-objects/character-name'

import { SeededRandom } from './seeded-random'

const BASE_URL = 'https://rickandmortyapi.com/api'

const NAMES = [
  'Rick Sanchez',
  'Morty Smith',
  'Summer Smith',
  'Beth Smith',
  'Jerry Smith',
  'Birdperson',
  'Squanchy',
  'Mr. Poopybutthole',
  'Evil Morty',
  'Unity',
  'Abradolf Lincler',
  'Krombopulos Michael',
] as const

const SPECIES = ['Human', 'Alien', 'Humanoid', 'Robot', 'Cronenberg'] as const

const GENDERS = ['Male', 'Female', 'Genderless', 'unknown'] as const

const LOCATIONS: readonly [CharacterLocation, ...CharacterLocation[]] = [
  { name: 'Earth', url: `${BASE_URL}/location/1` },
  { name: 'Mars', url: `${BASE_URL}/location/2` },
  { name: 'Citadel of Ricks', url: `${BASE_URL}/location/3` },
  { name: 'Gazorpazorp', url: `${BASE_URL}/location/4` },
  { name: 'Bird World', url: `${BASE_URL}/location/5` },
]

const TOTAL_EPISODES = 51
const START_DATE = Date.UTC(2023, 0, 1)
const END_DATE = Date.UTC(2026, 8, 1)

export interface CharacterSeedOptions {
  readonly count: number
  readonly seed: number
}

export function createCharacterSeed({ count, seed }: CharacterSeedOptions): Character[] {
  const random = new SeededRandom(seed)

  return Array.from({ length: count }, (_, index) => {
    const id = index + 1
    const episodeCount = random.integer(1, TOTAL_EPISODES)
    const firstEpisode = random.integer(1, TOTAL_EPISODES - episodeCount + 1)

    return Character.restore({
      id,
      name: CharacterName.create(random.pick(NAMES)),
      status: random.pick(CHARACTER_STATUSES),
      species: random.pick(SPECIES),
      type: '',
      gender: random.pick(GENDERS),
      origin: random.pick(LOCATIONS),
      location: random.pick(LOCATIONS),
      image: `${BASE_URL}/character/avatar/${id}.jpeg`,
      episode: Array.from(
        { length: episodeCount },
        (_episode, offset) => `${BASE_URL}/episode/${firstEpisode + offset}`,
      ),
      url: `${BASE_URL}/character/${id}`,
      created: new Date(random.integer(START_DATE, END_DATE)),
    })
  })
}
