import { IsNotEmpty } from 'class-validator';
import { IsEmail } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
