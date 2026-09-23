import { randomUUID } from 'node:crypto'

import { Injectable, type NestMiddleware } from '@nestjs/common'
import type { NextFunction, Request, Response } from 'express'

export const REQUEST_ID_HEADER = 'x-request-id'

const MAX_REQUEST_ID_LENGTH = 128

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const incoming = request.header(REQUEST_ID_HEADER)
    const requestId = incoming && incoming.length <= MAX_REQUEST_ID_LENGTH ? incoming : randomUUID()

    request.headers[REQUEST_ID_HEADER] = requestId
    response.setHeader(REQUEST_ID_HEADER, requestId)
    next()
  }
}
