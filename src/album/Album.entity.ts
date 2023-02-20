import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4
  
  @Column({
    type: 'varchar',
    length: 20
  })
  name: string;

  @Column({
    type: 'int'
  })
  year: number;

  @Column({
    nullable: true
  })
  artistId: string | null; // refers to Artist
}