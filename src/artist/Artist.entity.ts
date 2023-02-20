import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({
    nullable: false,
    type: 'varchar'
  })
  name: string;

  @Column({
    nullable: false,
    default: false
  })
  grammy: boolean;
}