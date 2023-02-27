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
        id
      }
    })
    
    return user;
  }

  async getUserByLogin(login: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        login
      }
    })
    
    return user;
  }
  async addUser(user: CreateUserDto): Promise<User> {
    await this.userRepository.insert(user);
    const newUser = await this.userRepository.findOne({ where: { login: user.login } });

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

    return await this.userRepository.findOneOrFail({
      where: {
        id
      }
    });
  }

  async deleteUser(id: string): Promise<Boolean> {
    await this.userRepository.delete({
      id: id
    })
    
    return Promise.resolve(true)
  }
  async updateRefreshToken(id: string, refreshToken: string) {
    await this.userRepository.update(id, {
      refreshToken
    })
  }
}
