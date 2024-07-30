import { IsString } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class TableVersions {
  @PrimaryGeneratedColumn()
  @IsString()
  table_version: string

  @Column()
  @IsString()
  content: string

  @Column()
  @IsString()
  date_created: string
}
