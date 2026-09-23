import type { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

import { AppModule } from '@/app.module'
import { CharacterRepository } from '@/modules/characters/domain/repositories/character.repository'
import { InMemoryCharacterRepository } from '@/modules/characters/infrastructure/persistence/in-memory-character.repository'

import { makeCharacter } from './factories/character.factory'

describe('CharactersController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(CharacterRepository)
      .useValue(
        new InMemoryCharacterRepository([
          makeCharacter({ id: 1, name: 'Rick Sanchez', status: 'Alive' }),
          makeCharacter({ id: 2, name: 'Morty Smith', status: 'Dead' }),
          makeCharacter({ id: 3, name: 'Summer Smith', status: 'Alive' }),
        ]),
      )
      .compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  test('deve listar personagens no formato de resposta da API Rick and Morty', async () => {
    const response = await request(app.getHttpServer())
      .get('/characters')
      .query({ page: 1, limit: 2 })
      .expect(200)

    expect(response.body.info).toEqual({ count: 3, pages: 2, next: 2, prev: null })
    expect(response.body.results).toHaveLength(2)
    expect(response.body.results[0]).toMatchObject({
      id: 1,
      name: 'Rick Sanchez',
      origin: { name: 'Earth' },
      created: '2024-02-22T00:00:00.000Z',
    })
  })

  test('deve filtrar por nome e por status sem diferenciar maiúsculas', async () => {
    const response = await request(app.getHttpServer())
      .get('/characters')
      .query({ name: 'smith', status: 'alive' })
      .expect(200)

    expect(response.body.results.map((character: { id: number }) => character.id)).toEqual([3])
  })

  test('deve rejeitar um status desconhecido', async () => {
    const response = await request(app.getHttpServer())
      .get('/characters')
      .query({ status: 'zombie' })
      .expect(400)

    expect(response.body.error).toBe('VALIDATION_FAILED')
  })

  test('deve atualizar o nome de um personagem', async () => {
    const response = await request(app.getHttpServer())
      .patch('/characters/1')
      .send({ name: 'Rick Sanchez Edited' })
      .expect(200)

    expect(response.body.name).toBe('Rick Sanchez Edited')
  })

  test('deve retornar 404 ao atualizar um personagem inexistente', async () => {
    const response = await request(app.getHttpServer())
      .patch('/characters/999')
      .send({ name: 'Nobody' })
      .expect(404)

    expect(response.body.error).toBe('CHARACTER_NOT_FOUND')
  })

  test('deve retornar 400 quando o corpo for inválido', async () => {
    await request(app.getHttpServer()).patch('/characters/1').send({ name: '' }).expect(400)
  })

  test('deve remover um personagem e deixar de listá-lo', async () => {
    await request(app.getHttpServer()).delete('/characters/2').expect(204)

    const response = await request(app.getHttpServer()).get('/characters').expect(200)

    expect(response.body.info.count).toBe(2)
  })

  test('deve retornar 404 ao remover um personagem inexistente', async () => {
    await request(app.getHttpServer()).delete('/characters/999').expect(404)
  })

  test('deve devolver o request id recebido', async () => {
    const response = await request(app.getHttpServer())
      .get('/characters')
      .set('x-request-id', 'trace-123')
      .expect(200)

    expect(response.headers['x-request-id']).toBe('trace-123')
  })
})
