export abstract class DomainError extends Error {
  abstract readonly code: string

  protected constructor(message: string) {
    super(message)
    this.name = new.target.name
  }
}

export abstract class NotFoundError extends DomainError {}

export abstract class ValidationError extends DomainError {}
