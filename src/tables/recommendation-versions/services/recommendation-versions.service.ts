import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { CrudService } from '../../../basic'
import { RecommendationVersions } from '../models/recommendation-version'

@Injectable()
export class RecommendationVersionsService extends CrudService<RecommendationVersions> {
  constructor (@InjectRepository(RecommendationVersions) protected readonly repo: Repository<RecommendationVersions>) {
    super(repo)
  }
}
