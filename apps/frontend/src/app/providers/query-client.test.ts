import { AxiosError, AxiosHeaders } from 'axios'
import { describe, expect, test } from 'vitest'

import { createQueryClient } from './query-client'

function axiosErrorWithStatus(status: number): AxiosError {
  return new AxiosError('failed', String(status), undefined, undefined, {
    status,
    statusText: String(status),
    data: undefined,
    headers: {},
    config: { headers: new AxiosHeaders() },
  })
}

function retry(failureCount: number, error: Error): boolean {
  const option = createQueryClient().getDefaultOptions().queries?.retry
  if (typeof option !== 'function') {
    throw new Error('retry should be a function')
  }
  return option(failureCount, error)
}

describe('createQueryClient', () => {
  test('deve tentar novamente falhas de rede e de servidor um número limitado de vezes', () => {
    expect(retry(0, new Error('network'))).toBe(true)
    expect(retry(1, axiosErrorWithStatus(503))).toBe(true)
    expect(retry(2, axiosErrorWithStatus(503))).toBe(false)
  })

  test('não deve tentar novamente erros do cliente', () => {
    expect(retry(0, axiosErrorWithStatus(404))).toBe(false)
  })
})
