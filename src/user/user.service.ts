import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUIDVersion } from 'class-validator';
import { User } from 'src/user/User.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './CreateUser.dto';
import { UpdatePasswordDto } from './UpdatePassword.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users
  }
  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }
    })
    return user;
  }
  async addUser(user: User): Promise<CreateUserDto> {
    const newUser = await this.userRepository.create({ ...user });
    await this.userRepository.save(newUser);

    return newUser;
  }
  async updateUser(id: string, data: UpdatePasswordDto): Promise<User> {
    await this.userRepository.update({
      id: id
    }, {
      password: data.newPassword,
      version: () => 'version + 1',
      updatedAt: Date.now()
    })
    // const userIndex = DB.users.findIndex(u => u.id === id);
    // DB.users[userIndex].password = data.newPassword;
    // DB.users[userIndex].version = DB.users[userIndex].version + 1;
    // DB.users[userIndex].updatedAt = Date.now()

    return await this.userRepository.findOneOrFail({
      where: {
        id
      }
    });
  }

  async deleteUser(id: string): Promise<Boolean> {
    // DB.users = DB.users.filter(u => u.id !== id);
    await this.userRepository.delete({
      id: id
    })
    
    return Promise.resolve(true)
  }
}
