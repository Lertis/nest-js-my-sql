import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SavedAnswersController } from './controllers/saved-answers.controller'
import { SavedAnswersService } from './services/saved-answers.service'
import { SavedAnswer } from './models/saved-answer'

@Module({
  imports: [TypeOrmModule.forFeature([SavedAnswer])],
  controllers: [SavedAnswersController],
  providers: [SavedAnswersService],
  exports: [TypeOrmModule]
})
export class SavedAnswersModule { }
