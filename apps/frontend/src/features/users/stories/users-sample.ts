import type { User } from '@/features/users/model/user'

const rows: ReadonlyArray<readonly [string, User['status'], number, string, string]> = [
  ['Rick Sanchez', 'alive', 2, 'Earth', '2024-02-22'],
  ['Morty Smith', 'alive', 14, 'Earth', '2025-05-05'],
  ['Rick Sanchez', 'dead', 3, 'Earth', '2025-12-11'],
  ['Rick Sanchez', 'dead', 50, 'Mars', '2023-12-24'],
  ['Morty Smith', 'alive', 32, 'Mars', '2026-06-01'],
  ['Morty Smith', 'alive', 1, 'Mars', '2024-08-02'],
  ['Rick Sanchez', 'alive', 7, 'Earth', '2026-04-22'],
  ['Morty Smith', 'alive', 3, 'Earth', '2026-04-16'],
  ['Rick Sanchez', 'dead', 1, 'Mars', '2026-07-05'],
  ['Rick Sanchez', 'dead', 14, 'Mars', '2024-11-28'],
  ['Rick Sanchez', 'dead', 22, 'Earth', '2025-08-19'],
]

export const usersSample: User[] = rows.map(([name, status, episodes, origin, date], index) => ({
  id: index + 1,
  name,
  status,
  species: 'Human',
  episodes,
  origin,
  createdAt: `${date}T00:00:00.000Z`,
}))
