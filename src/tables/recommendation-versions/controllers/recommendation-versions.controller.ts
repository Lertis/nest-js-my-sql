import { Body, Controller, Delete, Get, Param, Post, Req, Res, UsePipes } from '@nestjs/common'
import { Request, Response } from 'express'

import { RecommendationVersionsService } from '../services/recommendation-versions.service'
import { RecommendationVersions } from '../models/recommendation-version'
import { ZodValidationPipe } from '../../../basic/request-body-validation'
import { RecommendationVersionsDTO, createRecommendationVersionsSchema } from '../pipes/request-body-recommendation-versions'

import { Routes } from '../../../enums'

@Controller(Routes.RECOMMENDATION_VERSIONS)
export class RecommendationVersionsController {
  constructor (private readonly recmVersionsService: RecommendationVersionsService) { }

  @Get()
  getAll () {
    return this.recmVersionsService.findAll()
  }

  @Get(':id')
  getByVersion (@Param('id') id: string): Promise<RecommendationVersions | null> {
    return this.recmVersionsService.findOne({ table_version: id })
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createRecommendationVersionsSchema))
  create (@Body() _: RecommendationVersionsDTO, @Req() request: Request<RecommendationVersions>, @Res() response: Response<RecommendationVersions>) {
    response.send(request.body)
    this.recmVersionsService.create(request.body)
  }

  @Delete(':id')
  remove (@Param('id') id: string, @Res() response: Response<string>) {
    response.status(200)
    response.send(id)
    this.recmVersionsService.deleteByCriteria({ table_version: id })
  }
}
