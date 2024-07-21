import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { CrudService } from '../../../basic'
import { UserDto } from '../models/user'

@Injectable()
export class UserService extends CrudService<UserDto> {
  constructor (@InjectRepository(UserDto) protected readonly repo: Repository<UserDto>) {
    super(repo)
  }
}
