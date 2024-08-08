import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

export class CreateLogDto {
  event_id: number;
  event_description: string;
  event_timestamp: Date;
}

@Entity('logs')  // Specify the table name
export class Logs {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  event_id: number;

  @Column()
  event_description: string;

  @Column()
  event_timestamp: Date;
}
