import { NotFoundError } from '@/shared/domain/domain-error'

export class CharacterNotFoundError extends NotFoundError {
  readonly code = 'CHARACTER_NOT_FOUND'

  constructor(id: number) {
    super(`Character with id ${id} was not found`)
  }
}
