import { IsString, IsInt } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class UserDto {
  @PrimaryGeneratedColumn()
  @IsString()
  id: string

  @Column()
  @IsString()
  name: string

  @Column()
  @IsInt()
  age: number

  @Column()
  @IsString()
  dateCreated: string
}
