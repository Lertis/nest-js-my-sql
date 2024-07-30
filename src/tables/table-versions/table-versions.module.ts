import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TableVersionsController } from './controllers/table-versions.controller'
import { TableVersionsService } from './services/table-versions.service'
import { TableVersions } from './models/table-version'

@Module({
  imports: [TypeOrmModule.forFeature([TableVersions])],
  controllers: [TableVersionsController],
  providers: [TableVersionsService],
  exports: [TypeOrmModule]
})
export class TableVersionsModule { }
