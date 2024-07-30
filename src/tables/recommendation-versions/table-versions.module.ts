import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RecommendationVersionsController } from './controllers/recommendation-versions.controller'
import { RecommendationVersionsService } from './services/recommendation-versions.service'
import { RecommendationVersions } from './models/recommendation-version'

@Module({
  imports: [TypeOrmModule.forFeature([RecommendationVersions])],
  controllers: [RecommendationVersionsController],
  providers: [RecommendationVersionsService],
  exports: [TypeOrmModule]
})
export class RecommendationVersionsModule { }
