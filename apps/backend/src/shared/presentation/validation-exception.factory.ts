import { BadRequestException } from '@nestjs/common'
import type { StandardSchemaV1 } from '@standard-schema/spec'

export interface ValidationIssue {
  readonly path: string
  readonly message: string
}

function formatPath(issue: StandardSchemaV1.Issue): string {
  return (issue.path ?? [])
    .map((segment) => String(typeof segment === 'object' ? segment.key : segment))
    .join('.')
}

export function createValidationException(
  issues: readonly StandardSchemaV1.Issue[],
): BadRequestException {
  return new BadRequestException({
    statusCode: 400,
    error: 'VALIDATION_FAILED',
    message: 'Request validation failed',
    issues: issues.map((issue): ValidationIssue => ({
      path: formatPath(issue),
      message: issue.message,
    })),
  })
}
