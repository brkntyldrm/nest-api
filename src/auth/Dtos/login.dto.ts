import { Trim } from 'class-sanitizer';
import { IsString } from 'class-validator';

export class LoginDto {
  @Trim()
  @IsString()
  public readonly credential: string;

  @Trim()
  @IsString()
  public readonly password: string;
}
