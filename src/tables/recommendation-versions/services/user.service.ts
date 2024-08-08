import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Logs } from '../models/user'  // Update with the actual path
import { CrudService } from '../../../basic'

@Injectable()
export class UserService extends CrudService<Logs> {
  constructor (@InjectRepository(Logs) protected readonly repo: Repository<Logs>) {
    super(repo)
  }
}
