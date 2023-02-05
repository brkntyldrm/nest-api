import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class AuthenticateConfigService implements JwtOptionsFactory {
  constructor(private configService: ConfigService) {}

  async createJwtOptions() {
    return {
      secret: this.configService.get('JWT_SECRET'),
      signOptions: {
        expiresIn: 10,
      },
    };
  }
}
