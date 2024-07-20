import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersController } from './controllers/users.controller'
import { UsersService } from './services/users.service'
import { UserDto } from './models/user'

@Module({
  imports: [TypeOrmModule.forFeature([UserDto])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule]
})
export class UsersModule { }
