import { Controller, Post, Body, Get } from '@nestjs/common'
import { UserService } from '../services/user.service'
import {Logs,CreateLogDto } from '../models/user'

@Controller('logs')
export class UserController {
  constructor (private readonly userService: UserService) { }

  @Get()
  getAll () {
    return this.userService.findAll()
  }

  @Post()
  async create (@Body() createUserDto: CreateLogDto): Promise<Logs> {
    return this.userService.create({ ...createUserDto })
  }
}
