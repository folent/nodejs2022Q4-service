import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { isUUID, UUIDVersion } from 'class-validator';
import { User } from 'src/user/User.entity';
import { UserService } from './user.service';
import { v4 } from 'uuid'
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './CreateUser.dto';
import { UpdatePasswordDto } from './UpdatePassword.dto';
import { JwtAuthGuard } from 'src/auth/jwt-guard';

@ApiTags('user')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async getUsers() {
    const users = await this.userService.getUsers();
    return users
  }
  @Get('/:id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'User is not found' })
  @UseInterceptors(ClassSerializerInterceptor)
  async getUser(@Param('id') id: UUIDVersion): Promise<CreateUserDto> {
    if (!isUUID(id)) {
      throw new HttpException('id is not validate', HttpStatus.BAD_REQUEST)
    }
    const user = await this.userService.getUser(id.toString());

    if (!user) {
      throw new HttpException('user doesn`t exists', HttpStatus.NOT_FOUND)
    }
    return user
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @UseInterceptors(ClassSerializerInterceptor)
  async addUser(@Req() req: Request) {
    const newUser = new User({
      ...req.body,
      id: v4(),
      createdAt: new Date().valueOf(),
      updatedAt: new Date().valueOf()
    })
    const user = await this.userService.addUser(newUser);
    

    return user
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update user' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'User is not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseInterceptors(ClassSerializerInterceptor)
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdatePasswordDto
    ): Promise<CreateUserDto> {
      
    if (!isUUID(id)) {
      throw new HttpException('id is not validate', HttpStatus.BAD_REQUEST)
    }
    const user = await this.userService.getUser(id);

    if (!user) {
      throw new HttpException('user doesn`t exists', HttpStatus.NOT_FOUND)
    } 

    if (user.password !== body.oldPassword) {
      throw new HttpException('old password doesn`t correct', HttpStatus.FORBIDDEN)
    }

    const updatedUser = await this.userService.updateUser(id, body)

    return updatedUser
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete user' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'User deleted' })
  @ApiBadRequestResponse({ description: 'Validation errors' })
  @ApiNotFoundResponse({ description: 'User is not found' })
  async deleteUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response
  ){
    if (!isUUID(id)) {
      throw new HttpException('id is not validate', HttpStatus.BAD_REQUEST)
    }
    const user = await this.userService.getUser(id);

    if (!user) {
      throw new HttpException('user doesn`t exists', HttpStatus.NOT_FOUND)
    }
    await this.userService.deleteUser(id);

    return res.status(StatusCodes.NO_CONTENT).json(id)
  }
}
