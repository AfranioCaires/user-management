import 'reflect-metadata'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from './app.module'
import { loadEnv } from './config/env'
import { REQUEST_ID_HEADER } from './shared/presentation/request-id.middleware'

async function bootstrap(): Promise<void> {
  const env = loadEnv()
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.enableCors({
    origin: env.CORS_ORIGIN,
    methods: ['GET', 'PATCH', 'DELETE'],
    exposedHeaders: [REQUEST_ID_HEADER],
  })
  app.disable('x-powered-by')
  app.enableShutdownHooks()
  await app.listen(env.PORT)

  Logger.log(`Backend listening on port ${env.PORT}`, 'Bootstrap')
}

void bootstrap()
