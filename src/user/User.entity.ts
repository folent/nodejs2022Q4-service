import { Exclude } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, DatabaseType, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string; // uuid v4

    @Column()
    login: string;

    @Column()
    @Exclude()
    password: string;

    @Column({
      default: 1
    })
    version: number; // integer number, increments on update

    @Column({
        nullable: true
    })
    refreshToken: string

    @Column({
      nullable: true,
      type: 'bigint',
      transformer: {
          from(value: string): number {
              return Number(value);
          },
          to(value) {
              return value;
          }
        }
    })
    createdAt: number; // timestamp of creation

    @Column({
      nullable: true,
      type: 'bigint',
      transformer: {
          from(value: string): number {
              return Number(value);
          },
          to(value) {
              return value;
          }
        }
    })
    updatedAt: number; // timestamp of last update

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
      }
  }
