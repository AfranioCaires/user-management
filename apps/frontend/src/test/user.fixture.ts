import type { User, UsersPage } from '@/features/users/model/user'

export function makeUser(overrides: Partial<User> = {}): User {
  return {
    id: 1,
    name: 'Rick Sanchez',
    status: 'alive',
    species: 'Human',
    episodes: 2,
    origin: 'Earth',
    createdAt: '2024-02-22T00:00:00.000Z',
    ...overrides,
  }
}

export function makeUsersPage(users: User[], meta: Partial<UsersPage['meta']> = {}): UsersPage {
  return {
    data: users,
    meta: { page: 1, perPage: 15, total: users.length, totalPages: 1, ...meta },
  }
}
