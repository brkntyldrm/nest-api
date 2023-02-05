import { Trim } from 'class-sanitizer';
import {
  IsAlpha,
  IsEmail,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @Trim()
  @IsEmail()
  public readonly email: string;

  @Trim()
  @IsString()
  public readonly username: string;

  @Trim()
  @IsAlpha()
  @IsString()
  public readonly name: string;

  @Trim()
  @IsAlpha()
  @IsString()
  public readonly lastname: string;

  @MinLength(8)
  @IsString()
  public readonly password: string;

  @IsPhoneNumber()
  @IsString()
  public readonly phone_number: string;
}
