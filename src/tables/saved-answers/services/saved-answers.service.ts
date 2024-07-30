import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { CrudService } from '../../../basic'
import { SavedAnswer } from '../models/saved-answer'

@Injectable()
export class SavedAnswersService extends CrudService<SavedAnswer> {
  constructor (@InjectRepository(SavedAnswer) protected readonly repo: Repository<SavedAnswer>) {
    super(repo)
  }
}
