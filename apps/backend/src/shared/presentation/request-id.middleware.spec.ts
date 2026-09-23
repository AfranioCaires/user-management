import type { NextFunction, Request, Response } from 'express'
import { describe, expect, test, vi } from 'vitest'

import { REQUEST_ID_HEADER, RequestIdMiddleware } from './request-id.middleware'

function run(incoming?: string) {
  const headers: Record<string, string | undefined> = { [REQUEST_ID_HEADER]: incoming }
  const request = {
    headers,
    header: (name: string) => headers[name.toLowerCase()],
  } as unknown as Request
  const setHeader = vi.fn()
  const response = { setHeader } as unknown as Response
  const next: NextFunction = vi.fn()

  new RequestIdMiddleware().use(request, response, next)

  return { headers, setHeader, next }
}

describe('RequestIdMiddleware', () => {
  test('deve reutilizar o request id recebido', () => {
    const { headers, setHeader, next } = run('abc-123')

    expect(headers[REQUEST_ID_HEADER]).toBe('abc-123')
    expect(setHeader).toHaveBeenCalledWith(REQUEST_ID_HEADER, 'abc-123')
    expect(next).toHaveBeenCalledOnce()
  })

  test('deve gerar um request id quando nenhum for informado', () => {
    const { headers } = run()

    expect(headers[REQUEST_ID_HEADER]).toMatch(/^[0-9a-f-]{36}$/)
  })

  test('deve substituir um request id grande demais', () => {
    const { headers } = run('x'.repeat(200))

    expect(headers[REQUEST_ID_HEADER]).toMatch(/^[0-9a-f-]{36}$/)
  })
})
