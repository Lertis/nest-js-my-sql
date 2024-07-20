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
  getAllUsers () {
    return this.usersService.getAllUsers()
  }

  @Get(':id')
  getUserById (@Param('id') id: string): Promise<UserDto | null> {
    return this.usersService.getUserById(id)
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  createUser (@Body() _: UserDTO, @Req() request: Request<UserDto>, @Res() response: Response<UserDto>) {
    response.send(request.body)
    this.usersService.setUser(request.body)
  }

  @Delete(':id')
  removeUser (@Param('id') id: string, @Res() response: Response<string>) {
    response.status(200)
    response.send(id)
    this.usersService.removeUser(id)
  }
}
