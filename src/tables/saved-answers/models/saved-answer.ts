import { IsString } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class SavedAnswer {
  @PrimaryGeneratedColumn()
  @IsString()
  id: string

  @Column()
  @IsString()
  user_id: string

  @Column()
  @IsString()
  answers: string

  @Column()
  @IsString()
  table_version: string

  @Column()
  @IsString()
  date_created: string
}
