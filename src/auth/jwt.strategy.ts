import { HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: String(process.env.JWT_SECRET),
    });
  }

  async validate(userInfo: object) {
    if (!userInfo) {
      throw new HttpException('Token invalid.', HttpStatus.BAD_REQUEST);
    }

    const userInstance = await this.userRepository.create(userInfo);

    const user: User = await this.authService.validateUser(userInstance);

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    }

    return user;
  }
}
