import { Body, Controller, Delete, Get, Param, Post, Req, Res, UsePipes } from '@nestjs/common'
import { Request, Response } from 'express'

import { UsersService } from '../services/users.service'
import { ZodValidationPipe } from '../pipes/request-body-validation'
import { createUserSchema, UserDTO } from '../pipes/request-body-users'
import { Routes } from '../../../enums'
import { UserDto } from '../models/user'

@Controller(Routes.USERS)
export class UsersController {
  constructor (private readonly usersService: UsersService) { }

  @Get()
  getAll () {
    return this.usersService.getAll()
  }

  @Get(':id')
  getById (@Param('id') id: string): Promise<UserDto | null> {
    return this.usersService.getById(id)
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  createUser (@Body() _: UserDTO, @Req() request: Request<UserDto>, @Res() response: Response<UserDto>) {
    response.send(request.body)
    this.usersService.add(request.body)
  }

  @Delete(':id')
  removeUser (@Param('id') id: string, @Res() response: Response<string>) {
    response.status(200)
    response.send(id)
    this.usersService.remove(id)
  }
}
