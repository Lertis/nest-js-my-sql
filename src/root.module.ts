import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

import {
  TableVersionsModule, TableVersions, TableVersionsController,
  RecommendationVersionsModule, RecommendationVersions, RecommendationVersionsController,
  SavedAnswersModule, SavedAnswers, SavedAnswersController
} from './tables'

import { LoggerMiddleware } from './middlewares'
import { Logs } from './tables/recommendation-versions/models/user'
import { UserController } from './tables/recommendation-versions/controllers/user.controller'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'configs/.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'postgres',
        host: 'ep-falling-wind-a2ll0fax.eu-central-1.pg.koyeb.app',
        port: 5432,
        username: 'koyeb-adm',
        password: 'V4esSNnKZHi0',
        database: 'koyebdb',
        ssl: true,
        entities: [TableVersions, RecommendationVersions, SavedAnswers, Logs]
      }),
      inject: [ConfigService]
    }),
    TableVersionsModule,
    RecommendationVersionsModule,
    SavedAnswersModule
  ]
})
export class RootModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(
      TableVersionsController,
      RecommendationVersionsController,
      SavedAnswersController,
      UserController
    )
  }
}
