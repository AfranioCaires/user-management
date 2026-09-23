import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
} from '@nestjs/common'

import { DeleteCharacterUseCase } from '@/modules/characters/application/use-cases/delete-character.use-case'
import { ListCharactersUseCase } from '@/modules/characters/application/use-cases/list-characters.use-case'
import { UpdateCharacterNameUseCase } from '@/modules/characters/application/use-cases/update-character-name.use-case'

import {
  type CharacterListResponse,
  CharacterPresenter,
  type CharacterResponse,
} from './presenters/character.presenter'
import { characterIdParamSchema } from './schemas/character-id.param'
import {
  type ListCharactersQuery,
  listCharactersQuerySchema,
} from './schemas/list-characters.query'
import {
  type UpdateCharacterNameBody,
  updateCharacterNameBodySchema,
} from './schemas/update-character-name.body'

@Controller('characters')
export class CharactersController {
  constructor(
    private readonly listCharacters: ListCharactersUseCase,
    private readonly updateCharacterName: UpdateCharacterNameUseCase,
    private readonly deleteCharacter: DeleteCharacterUseCase,
  ) {}

  @Get()
  async list(
    @Query({ schema: listCharactersQuerySchema }) query: ListCharactersQuery,
  ): Promise<CharacterListResponse> {
    const result = await this.listCharacters.execute({
      page: query.page,
      limit: query.limit,
      ...(query.name ? { name: query.name } : {}),
      ...(query.status ? { status: query.status } : {}),
    })

    return CharacterPresenter.toListResponse(result.items, result)
  }

  @Patch(':id')
  async updateName(
    @Param('id', { schema: characterIdParamSchema }) id: number,
    @Body({ schema: updateCharacterNameBodySchema }) body: UpdateCharacterNameBody,
  ): Promise<CharacterResponse> {
    const character = await this.updateCharacterName.execute({ id, name: body.name })
    return CharacterPresenter.toResponse(character)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', { schema: characterIdParamSchema }) id: number): Promise<void> {
    await this.deleteCharacter.execute({ id })
  }
}
