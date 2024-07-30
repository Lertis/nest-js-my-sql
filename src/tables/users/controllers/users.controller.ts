import { Body, Controller, Delete, Get, Param, Post, Req, Res, UsePipes } from '@nestjs/common'
import { Request, Response } from 'express'

import { UserService } from '../services/users.service'

import { ZodValidationPipe } from '../../../basic/request-body-validation'
import { createUserSchema, UserDTO } from '../pipes/request-body-users'
import { Routes } from '../../../enums'
import { UserDto } from '../models/user'

@Controller(Routes.USERS)
export class UsersController {
  constructor (private readonly usersService: UserService) { }

  @Get()
  getAll () {
    return this.usersService.findAll()
  }

  @Get(':id')
  getById (@Param('id') id: string): Promise<UserDto | null> {
    return this.usersService.findOneById(id)
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  createUser (@Body() _: UserDTO, @Req() request: Request<UserDto>, @Res() response: Response<UserDto>) {
    response.send(request.body)
    this.usersService.create(request.body)
  }

  @Delete(':id')
  removeUser (@Param('id') id: string, @Res() response: Response<string>) {
    response.status(200)
    response.send(id)
    this.usersService.deleteById(id)
  }
}
