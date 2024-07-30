import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { CrudService } from '../../../basic'
import { TableVersions } from '../models/table-version'

@Injectable()
export class TableVersionsService extends CrudService<TableVersions> {
  constructor (@InjectRepository(TableVersions) protected readonly repo: Repository<TableVersions>) {
    super(repo)
  }
}
