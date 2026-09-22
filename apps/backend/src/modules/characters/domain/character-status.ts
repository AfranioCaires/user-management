export const CHARACTER_STATUSES = ['Alive', 'Dead', 'unknown'] as const

export type CharacterStatus = (typeof CHARACTER_STATUSES)[number]
