import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "src/user/CreateUser.dto";
import { AuthService } from "./auth.service";
import { RefreshTokenDto } from "./RefreshToken.dto";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
    ) {}

  @Post('/signup')
  async signup (@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }
  @Post('/login')
  async login (@Body() user: CreateUserDto) {
    return this.authService.login(user);
  }
  @Post('/refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refreshToken(body.refreshToken);
  }
}