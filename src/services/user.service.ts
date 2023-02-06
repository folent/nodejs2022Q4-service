import { Injectable } from '@nestjs/common';
import { UUIDVersion } from 'class-validator';
import DB from 'src/db/db';
import { CreateUserDto, UpdatePasswordDto, UserEntity } from 'src/entities/User.entity';

@Injectable()
export class UserService {
  getUsers(): Promise<UserEntity[]> {
    return Promise.resolve(DB.users)
  }
  getUser(id: UUIDVersion): Promise<UserEntity> {
    const user = DB.users.find(u => u.id === id)
    return Promise.resolve(user)
  }
  addUser(user: UserEntity): Promise<CreateUserDto> {
    DB.users.push(user)

    return Promise.resolve(user)
  }
  updateUser(id: UUIDVersion, data: UpdatePasswordDto): Promise<CreateUserDto> {
    const userIndex = DB.users.findIndex(u => u.id === id);
    DB.users[userIndex].password = data.newPassword;
    DB.users[userIndex].version = DB.users[userIndex].version + 1;
    DB.users[userIndex].updatedAt = Date.now()

    return Promise.resolve(DB.users[userIndex])
  }

  deleteUser(id: UUIDVersion): Promise<Boolean> {
    DB.users = DB.users.filter(u => u.id !== id);
    
    return Promise.resolve(true)
  }
}
