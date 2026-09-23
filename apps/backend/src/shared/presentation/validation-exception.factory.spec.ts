import { BadRequestException } from '@nestjs/common'
import { describe, expect, test } from 'vitest'

import { createValidationException } from './validation-exception.factory'

describe('createValidationException', () => {
  test('deve criar uma BadRequestException com o código de validação', () => {
    const exception = createValidationException([{ message: 'Invalid input' }])

    expect(exception).toBeInstanceOf(BadRequestException)
    expect(exception.getResponse()).toMatchObject({
      statusCode: 400,
      error: 'VALIDATION_FAILED',
      message: 'Request validation failed',
    })
  })

  test('deve informar o caminho de cada erro', () => {
    const exception = createValidationException([
      { message: 'Too small', path: ['page'] },
      { message: 'Required', path: [{ key: 'filters' }, 'name'] },
      { message: 'Invalid input' },
    ])

    expect(exception.getResponse()).toMatchObject({
      issues: [
        { path: 'page', message: 'Too small' },
        { path: 'filters.name', message: 'Required' },
        { path: '', message: 'Invalid input' },
      ],
    })
  })
})
