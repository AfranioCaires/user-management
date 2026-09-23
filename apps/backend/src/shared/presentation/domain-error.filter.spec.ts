import type { ArgumentsHost } from '@nestjs/common'
import { describe, expect, test, vi } from 'vitest'

import { CharacterNotFoundError } from '@/modules/characters/domain/errors/character-not-found.error'
import { InvalidCharacterNameError } from '@/modules/characters/domain/errors/invalid-character-name.error'
import { DomainError } from '@/shared/domain/domain-error'

import { DomainErrorFilter } from './domain-error.filter'

class GenericDomainError extends DomainError {
  readonly code = 'GENERIC'

  constructor() {
    super('generic failure')
  }
}

function capture(error: DomainError) {
  const json = vi.fn()
  const status = vi.fn(() => ({ json }))
  const host = {
    switchToHttp: () => ({ getResponse: () => ({ status }) }),
  } as unknown as ArgumentsHost

  new DomainErrorFilter().catch(error, host)

  return { status, json }
}

describe('DomainErrorFilter', () => {
  test('deve mapear erros de não encontrado para 404', () => {
    const { status, json } = capture(new CharacterNotFoundError(5))

    expect(status).toHaveBeenCalledWith(404)
    expect(json).toHaveBeenCalledWith({
      statusCode: 404,
      error: 'CHARACTER_NOT_FOUND',
      message: 'Character with id 5 was not found',
    })
  })

  test('deve mapear erros de validação para 422', () => {
    const { status } = capture(new InvalidCharacterNameError('name must not be empty'))

    expect(status).toHaveBeenCalledWith(422)
  })

  test('deve mapear qualquer outro erro de domínio para 400', () => {
    const { status } = capture(new GenericDomainError())

    expect(status).toHaveBeenCalledWith(400)
  })
})
