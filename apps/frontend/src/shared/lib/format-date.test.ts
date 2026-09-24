import { describe, expect, test } from 'vitest'

import { formatDate } from './format-date'

describe('formatDate', () => {
  test('deve formatar uma data ISO como dd/mm/aaaa', () => {
    expect(formatDate('2024-02-22T00:00:00.000Z')).toBe('22/02/2024')
  })

  test('deve usar UTC para não deslocar o dia', () => {
    expect(formatDate('2025-12-11T23:59:59.000Z')).toBe('11/12/2025')
  })
})
