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
    ConfigModule.forRoot({ envFilePath: 'configs/.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST_NAME'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER_NAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
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
