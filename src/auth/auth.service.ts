import { ForbiddenException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/CreateUser.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/User.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(UserService.name);
  constructor(private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
) {}

  async validateUser(id: string, pass: string): Promise<any> {
    const user = await this.userService.getUser(id);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  private async generateJwtToken(payload: any) {
    return this.jwtService.signAsync(
      {
        id: payload.id,
        login: payload.login
      },
      {
        secret: this.configService.get('JWT_SECRET_KEY'),
        expiresIn: this.configService.get('TOKEN_EXPIRE_TIME')
      })
  }
  private async generateJwtRefreshToken(payload: any) {
    return this.jwtService.signAsync(
      {
        id: payload.id,
        login: payload.login
      },
      {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
        expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME')
      })
  }
  async signUp (userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByLogin(userDto.login);
    if (candidate) {
        throw new HttpException('user is exist with this login', HttpStatus.BAD_REQUEST);
    }
    const salt = Number(this.configService.get<number>('CRYPT_SALT'))
    const hash = await bcrypt.hash(userDto.password, salt);
    const user = await this.userService.addUser({ ...userDto, password: hash });
    const token = await this.generateJwtToken(user);
    const refreshToken = await this.generateJwtRefreshToken(user);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

    await this.userService.updateRefreshToken(user.id, hashedRefreshToken);


    return {
      accessToken: token,
      refreshToken
    }
  }
  async login(user: CreateUserDto) {
    const candidate = await this.userService.getUserByLogin(user.login);

    if (candidate) {
      const isValidPassword = await bcrypt.compare(user.password, candidate.password);
      
      if (isValidPassword) {
        const token = await this.generateJwtToken(candidate);
        const refreshToken = await this.generateJwtRefreshToken(candidate);
        const salt = Number(this.configService.get<number>('CRYPT_SALT'));
        const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

        await this.userService.updateRefreshToken(candidate.id, hashedRefreshToken);

        return {
          accessToken: token,
          refreshToken
        };
      }
    }
    throw new ForbiddenException('user is unauthorized')
  }
  async refreshToken(token: string) {
    try {
      const isVerified = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
        ignoreExpiration: false
      })
      if (isVerified) {
        const decodedUser = this.jwtService.decode(token);
        const newToken = await this.generateJwtToken(decodedUser);
        const newRefreshToken = await this.generateJwtRefreshToken(decodedUser);
        const userId = decodedUser && decodedUser['id'];
        const salt = Number(this.configService.get<number>('CRYPT_SALT'));
        const hashedRefreshToken = await bcrypt.hash(newRefreshToken, salt);

        await this.userService.updateRefreshToken(userId, hashedRefreshToken)
  
        return {
          accessToken: newToken,
          refreshToken: newRefreshToken
        };
      }
    } catch (e) {
      throw new ForbiddenException('user is unauthorized')
    }
  }
}