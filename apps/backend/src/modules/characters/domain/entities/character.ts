import type { CharacterStatus } from '@/modules/characters/domain/character-status'
import type { CharacterName } from '@/modules/characters/domain/value-objects/character-name'

export interface CharacterLocation {
  readonly name: string
  readonly url: string
}

export interface CharacterProps {
  readonly id: number
  name: CharacterName
  readonly status: CharacterStatus
  readonly species: string
  readonly type: string
  readonly gender: string
  readonly origin: CharacterLocation
  readonly location: CharacterLocation
  readonly image: string
  readonly episode: readonly string[]
  readonly url: string
  readonly created: Date
}

export class Character {
  private constructor(private readonly props: CharacterProps) {}

  static restore(props: CharacterProps): Character {
    return new Character({ ...props, episode: [...props.episode] })
  }

  get id(): number {
    return this.props.id
  }

  get name(): CharacterName {
    return this.props.name
  }

  get status(): CharacterStatus {
    return this.props.status
  }

  get species(): string {
    return this.props.species
  }

  get type(): string {
    return this.props.type
  }

  get gender(): string {
    return this.props.gender
  }

  get origin(): CharacterLocation {
    return this.props.origin
  }

  get location(): CharacterLocation {
    return this.props.location
  }

  get image(): string {
    return this.props.image
  }

  get episode(): readonly string[] {
    return this.props.episode
  }

  get url(): string {
    return this.props.url
  }

  get created(): Date {
    return this.props.created
  }

  rename(name: CharacterName): void {
    this.props.name = name
  }
}
