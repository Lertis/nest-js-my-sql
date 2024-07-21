import { HttpException, HttpStatus } from '@nestjs/common'
import {
  Repository,
  FindOneOptions,
  FindOptionsWhere,
  UpdateResult,
  DeleteResult,
  DeepPartial,
  In
} from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'


export interface ICrudService<T> {
  create (entity: DeepPartial<T>): Promise<DeepPartial<T> & T>
  findOneById (id: string): Promise<T>
  findOne (criteria: FindOptionsWhere<T>): Promise<T>
  findAll (criteria?: FindOptionsWhere<T>): Promise<T[]>
  count (criteria?: FindOptionsWhere<T>): Promise<number>
  update (
    id: string,
    partialEntity: QueryDeepPartialEntity<T>
  ): Promise<UpdateResult>
  deleteById (id: string): Promise<DeleteResult>
  deleteByCriteria (criteria?: FindOptionsWhere<T>): Promise<void>
  checkIfExists (criteria: FindOptionsWhere<T>): Promise<boolean>
}

export abstract class CrudService<T> implements ICrudService<T> {
  constructor (protected readonly repository: Repository<T>) { }

  async create (entity: DeepPartial<T>) {
    try {
      return await this.repository.save(entity)
    } catch {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOneById (id: string): Promise<T> {
    try {
      return await this.repository.findOne({ where: { id } } as unknown as FindOneOptions<T>)
    } catch {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne (criteria: FindOptionsWhere<T>): Promise<T> {
    try {
      const res = await this.repository.findOne({ where: criteria })
      if (!res) throw new HttpException('Not found', HttpStatus.NOT_FOUND)
      return res
    } catch {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll (criteria?: FindOptionsWhere<T>): Promise<T[]> {
    try {
      const found = await this.repository.find({ where: criteria })
      if (!found) throw new HttpException('Not found', HttpStatus.NOT_FOUND)
      return found
    } catch {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async count (criteria?: FindOptionsWhere<T>): Promise<number> {
    try {
      return await this.repository.count({ where: criteria }) || 0
    } catch {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update (id: string, partialEntity: QueryDeepPartialEntity<T>): Promise<UpdateResult> {
    try {
      return await this.repository.update(id, partialEntity)
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateAndReturn (id: string, partialEntity: QueryDeepPartialEntity<T>,) {
    await this.update(id, partialEntity)
    return await this.findOneById(id)
  }

  async deleteById (id: string): Promise<DeleteResult> {
    try {
      return await this.repository.delete({ id } as unknown as FindOptionsWhere<T>)
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deleteByIdReturnId (id: string): Promise<string> {
    await this.deleteById(id)
    return id
  }


  async deleteByCriteria (criteria?: FindOptionsWhere<T>): Promise<void> {
    try {
      await this.repository.delete(criteria)
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deleteManyByIds (ids: string[]): Promise<DeleteResult> {
    try {
      return await this.repository.delete({ id: In(ids) } as unknown as FindOptionsWhere<T>)
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async checkIfExists (criteria: FindOptionsWhere<T>): Promise<boolean> {
    const entity = await this.repository.findOne({ where: criteria })
    return Boolean(entity)
  }
}
