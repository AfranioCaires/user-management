import { ValidationError } from '@/shared/domain/domain-error'

export class InvalidCharacterNameError extends ValidationError {
  readonly code = 'INVALID_CHARACTER_NAME'

  constructor(reason: string) {
    super(`Invalid character name: ${reason}`)
  }
}
