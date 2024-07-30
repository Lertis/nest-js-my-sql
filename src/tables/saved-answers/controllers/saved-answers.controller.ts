import { Body, Controller, Delete, Get, Param, Post, Req, Res, UsePipes } from '@nestjs/common'
import { Request, Response } from 'express'

import { SavedAnswersService } from '../services/saved-answers.service'
import { SavedAnswers } from '../models/saved-answer'
import { ZodValidationPipe } from '../../../basic/request-body-validation'
import { SavedAnswersDTO, createSavedAnswersSchema } from '../pipes/request-body-saved-answers'

import { Routes, SavedAnswersRoutes } from '../../../enums'

@Controller(Routes.SAVED_ANSWERS)
export class SavedAnswersController {
  constructor (private readonly savedAnswersService: SavedAnswersService) { }

  @Get()
  getAll () {
    return this.savedAnswersService.findAll()
  }

  @Get(`/${SavedAnswersRoutes.ID}/:id`)
  getById (@Param('id') id: string): Promise<SavedAnswers[] | null> {
    return this.savedAnswersService.findAll({ id })
  }

  @Get(`/${SavedAnswersRoutes.USER_ID}/:id`)
  getByUserId (@Param('id') id: string): Promise<SavedAnswers[] | null> {
    return this.savedAnswersService.findAll({ user_id: id })
  }

  @Get(`/${SavedAnswersRoutes.TABLE_VERSION}/:id`)
  getByVersionId (@Param('id') id: string): Promise<SavedAnswers | null> {
    return this.savedAnswersService.findOne({ table_version: id })
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createSavedAnswersSchema))
  create (@Body() _: SavedAnswersDTO, @Req() request: Request<SavedAnswers>, @Res() response: Response<SavedAnswers>) {
    response.send(request.body)
    this.savedAnswersService.create(request.body)
  }

  @Delete(':id')
  remove (@Param('id') id: string, @Res() response: Response<string>) {
    response.status(200)
    response.send(id)
    this.savedAnswersService.deleteByCriteria({ table_version: id })
  }
}
