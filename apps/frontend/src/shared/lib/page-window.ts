export function getPageWindow(page: number, totalPages: number, size: number): number[] {
  if (totalPages <= 0 || size <= 0) {
    return []
  }

  const windowSize = Math.min(size, totalPages)
  const half = Math.floor(windowSize / 2)
  const start = Math.min(Math.max(1, page - half), totalPages - windowSize + 1)

  return Array.from({ length: windowSize }, (_, index) => start + index)
}
