import { Body, Controller, Delete, Get, Param, Post, Req, Res, UsePipes } from '@nestjs/common'
import { Request, Response } from 'express'

import { SavedAnswersService } from '../services/saved-answers.service'
import { SavedAnswer } from '../models/saved-answer'
import { ZodValidationPipe } from '../../../basic/request-body-validation'
import { SavedAnswersDTO, createSavedAnswersSchema } from '../pipes/request-body-saved-answers'

import { Routes } from '../../../enums'

@Controller(Routes.SAVED_ANSWERS)
export class SavedAnswersController {
  constructor (private readonly savedAnswersService: SavedAnswersService) { }

  @Get()
  getAll () {
    return this.savedAnswersService.findAll()
  }

  @Get(':id')
  getById (@Param('id') id: string): Promise<SavedAnswer | null> {
    return this.savedAnswersService.findOne({ id })
  }

  @Get(':id')
  getByUserId (@Param('id') id: string): Promise<SavedAnswer | null> {
    return this.savedAnswersService.findOne({ user_id: id })
  }

  @Get(':id')
  getByVersionId (@Param('id') id: string): Promise<SavedAnswer | null> {
    return this.savedAnswersService.findOne({ table_version: id })
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createSavedAnswersSchema))
  create (@Body() _: SavedAnswersDTO, @Req() request: Request<SavedAnswer>, @Res() response: Response<SavedAnswer>) {
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
