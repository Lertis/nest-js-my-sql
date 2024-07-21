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
/*
@Injectable()
export class UsersService {
  constructor (@InjectRepository(UserDto) private readonly repo: Repository<UserDto>) { }

  async getAll (): Promise<UserDto[] | null> {
    return await this.repo.find()
  }

  async getById (id: string): Promise<UserDto | null> {
    return await this.repo.findOne({ where: { id } })
  }

  async add (user: UserDto): Promise<UserDto | null> {
    return await this.repo.save(this.repo.create(user))
  }

  async remove (id: string): Promise<UserDto | null> {
    const found = await this.getById(id)
    return this.repo.remove(found)
  }
}
 */
