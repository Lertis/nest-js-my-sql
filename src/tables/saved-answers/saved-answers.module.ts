import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SavedAnswersController } from './controllers/saved-answers.controller'
import { SavedAnswersService } from './services/saved-answers.service'
import { SavedAnswers } from './models/saved-answer'

@Module({
  imports: [TypeOrmModule.forFeature([SavedAnswers])],
  controllers: [SavedAnswersController],
  providers: [SavedAnswersService],
  exports: [TypeOrmModule]
})
export class SavedAnswersModule { }
