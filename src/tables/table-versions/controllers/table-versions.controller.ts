import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UsePipes } from '@nestjs/common'
import { Request, Response } from 'express'

import { TableVersionsService } from '../services/table-versions.service'
import { TableVersions } from '../models/table-version'
import { ZodValidationPipe } from '../../../basic/request-body-validation'
import { tableVersionsSchema, TableVersionsDTO } from '../pipes/request-body-table-versions'

import { Routes } from '../../../enums'

@Controller(Routes.TABLE_VERSIONS)
export class TableVersionsController {
  constructor (private readonly tableVersionsService: TableVersionsService) { }

  @Get()
  getAll () {
    return this.tableVersionsService.findAll()
  }

  @Get(':id')
  getByVersion (@Param('id') id: string): Promise<TableVersions | null> {
    return this.tableVersionsService.findOne({ version: id })
  }

  @Post()
  @UsePipes(new ZodValidationPipe(tableVersionsSchema))
  create (@Body() body: TableVersionsDTO) {
    this.tableVersionsService.create(body)
  }

  @Put()
  @UsePipes(new ZodValidationPipe(tableVersionsSchema))
  update (@Body() body: TableVersionsDTO, @Req() request: Request<TableVersions>, @Res() response: Response<TableVersions>) {
    response.send(request.body)
    this.tableVersionsService.updateByCriteria({ version: body.version }, request.body)
  }

  @Delete(':id')
  remove (@Param('id') id: string, @Res() response: Response<string>) {
    response.status(200)
    response.send(id)
    this.tableVersionsService.deleteByCriteria({ version: id })
  }
}
