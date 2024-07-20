import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { UserDto } from '../models/user'

@Injectable()
export class UsersService {
  constructor (@InjectRepository(UserDto) private readonly repo: Repository<UserDto>) { }

  async getAllUsers (): Promise<UserDto[] | null> {
    return await this.repo.find()
  }

  async getUserById (id: string): Promise<UserDto | null> {
    return await this.repo.findOne({ where: { id } })
  }

  async setUser (user: UserDto): Promise<UserDto | null> {
    return await this.repo.save(this.repo.create(user))
  }

  async removeUser (id: string): Promise<UserDto | null> {
    const found = await this.getUserById(id)
    return this.repo.remove(found)
  }
}
