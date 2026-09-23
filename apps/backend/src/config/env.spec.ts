import { describe, expect, test } from 'vitest'
import { ZodError } from 'zod'

import { loadEnv } from './env'

describe('loadEnv', () => {
  test('deve converter a porta e separar as origens de CORS', () => {
    expect(
      loadEnv({ PORT: '3001', CORS_ORIGIN: 'http://localhost:5173, http://app.test' }),
    ).toEqual({
      PORT: 3001,
      CORS_ORIGIN: ['http://localhost:5173', 'http://app.test'],
    })
  })

  test('deve exigir a porta', () => {
    expect(() => loadEnv({ CORS_ORIGIN: 'http://localhost:5173' })).toThrow(ZodError)
  })

  test('deve exigir a origem de CORS', () => {
    expect(() => loadEnv({ PORT: '3001' })).toThrow(ZodError)
  })

  test('deve rejeitar uma origem de CORS inválida', () => {
    expect(() => loadEnv({ PORT: '3001', CORS_ORIGIN: 'not-a-url' })).toThrow(ZodError)
  })
})
