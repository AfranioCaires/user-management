import { Module } from '@nestjs/common'

import { DeleteCharacterUseCase } from './application/use-cases/delete-character.use-case'
import { ListCharactersUseCase } from './application/use-cases/list-characters.use-case'
import { UpdateCharacterNameUseCase } from './application/use-cases/update-character-name.use-case'
import { CharacterRepository } from './domain/repositories/character.repository'
import { InMemoryCharacterRepository } from './infrastructure/persistence/in-memory-character.repository'
import { createCharacterSeed } from './infrastructure/seed/character-seed.factory'
import { CharactersController } from './presentation/http/characters.controller'

const SEED_OPTIONS = { count: 6748, seed: 20240222 } as const

@Module({
  controllers: [CharactersController],
  providers: [
    {
      provide: CharacterRepository,
      useFactory: () => new InMemoryCharacterRepository(createCharacterSeed(SEED_OPTIONS)),
    },
    {
      provide: ListCharactersUseCase,
      useFactory: (repository: CharacterRepository) => new ListCharactersUseCase(repository),
      inject: [CharacterRepository],
    },
    {
      provide: UpdateCharacterNameUseCase,
      useFactory: (repository: CharacterRepository) => new UpdateCharacterNameUseCase(repository),
      inject: [CharacterRepository],
    },
    {
      provide: DeleteCharacterUseCase,
      useFactory: (repository: CharacterRepository) => new DeleteCharacterUseCase(repository),
      inject: [CharacterRepository],
    },
  ],
})
export class CharactersModule {}
