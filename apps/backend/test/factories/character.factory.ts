import { Character, type CharacterProps } from '@/modules/characters/domain/entities/character'
import { CharacterName } from '@/modules/characters/domain/value-objects/character-name'

type CharacterOverrides = Partial<Omit<CharacterProps, 'name'>> & { readonly name?: string }

export function makeCharacter(overrides: CharacterOverrides = {}): Character {
  const { name = 'Rick Sanchez', ...rest } = overrides

  return Character.restore({
    id: 1,
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/1' },
    location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/1'],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: new Date('2024-02-22T00:00:00.000Z'),
    ...rest,
    name: CharacterName.create(name),
  })
}
