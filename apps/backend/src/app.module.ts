import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
  StandardSchemaValidationPipe,
} from '@nestjs/common'
import { APP_FILTER, APP_PIPE } from '@nestjs/core'

import { CharactersModule } from './modules/characters/characters.module'
import { DomainErrorFilter } from './shared/presentation/domain-error.filter'
import { RequestIdMiddleware } from './shared/presentation/request-id.middleware'
import { createValidationException } from './shared/presentation/validation-exception.factory'

@Module({
  imports: [CharactersModule],
  providers: [
    { provide: APP_FILTER, useClass: DomainErrorFilter },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new StandardSchemaValidationPipe({ exceptionFactory: createValidationException }),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestIdMiddleware).forRoutes('*path')
  }
}
