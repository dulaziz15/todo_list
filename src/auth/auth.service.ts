import { AuthLoginDto } from './dto/auth-login.dto';
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);

    const payload = {
      userId: user.id,
      nama: user.name,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(authLoginDto: AuthLoginDto) {
    const { email, password } = authLoginDto;

    const user = await this.usersService.findByEmail(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
