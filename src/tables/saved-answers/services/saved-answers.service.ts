import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { CrudService } from '../../../basic'
import { SavedAnswers } from '../models/saved-answer'

@Injectable()
export class SavedAnswersService extends CrudService<SavedAnswers> {
  constructor (@InjectRepository(SavedAnswers) protected readonly repo: Repository<SavedAnswers>) {
    super(repo)
  }
}
