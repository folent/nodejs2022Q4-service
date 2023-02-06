import { Exclude } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class UserEntity {
    id: string; // uuid v4
    login: string;

    @Exclude()
    password: string;
    version: number; // integer number, increments on update
    createdAt: number; // timestamp of creation
    updatedAt: number; // timestamp of last update

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
      }
  }

export interface UserResponse {
    users: UserEntity[]
}

export class CreateUserDto {
    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    password: string;
  }

export class UpdatePasswordDto {
    @IsNotEmpty()
    oldPassword: string; // previous password

    @IsNotEmpty()
    newPassword: string; // new password
  }