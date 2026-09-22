export interface PaginatedResult<T> {
  readonly items: readonly T[]
  readonly total: number
}
