import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RecommendationVersionsController } from './controllers/recommendation-versions.controller'
import { RecommendationVersionsService } from './services/recommendation-versions.service'
import { RecommendationVersions } from './models/recommendation-version'
import { Logs } from './models/user'
import { UserController } from './controllers/user.controller'
import { UserService } from './services/user.service'

@Module({
  imports: [TypeOrmModule.forFeature([RecommendationVersions, Logs])],
  controllers: [RecommendationVersionsController, UserController],
  providers: [RecommendationVersionsService, UserService],
  exports: [TypeOrmModule]
})
export class RecommendationVersionsModule { }
