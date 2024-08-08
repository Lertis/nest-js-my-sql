import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

import {
  TableVersionsModule, TableVersions, TableVersionsController,
  RecommendationVersionsModule, RecommendationVersions, RecommendationVersionsController,
  SavedAnswersModule, SavedAnswers, SavedAnswersController
} from './tables'

import { LoggerMiddleware } from './middlewares'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'configs/.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'ep-falling-wind-a2ll0fax.eu-central-1.pg.koyeb.app',
        port: 5432,
        username: 'koyeb-adm',
        password: 'V4esSNnKZHi0',
        database: 'koyebdb',
        ssl: true,
        entities: [TableVersions, RecommendationVersions, SavedAnswers]
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
      SavedAnswersController
    )
  }
}
