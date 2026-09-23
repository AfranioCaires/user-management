import { type ArgumentsHost, Catch, type ExceptionFilter, HttpStatus } from '@nestjs/common'
import type { Response } from 'express'

import { DomainError, NotFoundError, ValidationError } from '@/shared/domain/domain-error'

@Catch(DomainError)
export class DomainErrorFilter implements ExceptionFilter<DomainError> {
  catch(error: DomainError, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>()
    const statusCode = this.resolveStatus(error)

    response.status(statusCode).json({
      statusCode,
      error: error.code,
      message: error.message,
    })
  }

  private resolveStatus(error: DomainError): HttpStatus {
    if (error instanceof NotFoundError) {
      return HttpStatus.NOT_FOUND
    }

    if (error instanceof ValidationError) {
      return HttpStatus.UNPROCESSABLE_ENTITY
    }

    return HttpStatus.BAD_REQUEST
  }
}
