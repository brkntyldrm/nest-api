import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { InsertResult, Repository } from 'typeorm';
import { LoginDto } from './Dtos/login.dto';
import { RegisterDto } from './Dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(body: RegisterDto): Promise<InsertResult | object> {
    try {
      const { email }: RegisterDto = body;
      console.log(body);
      const exist: User = await this.userRepository.findOneBy({ email: email });

      if (exist) {
        throw new HttpException('User Exist.', HttpStatus.BAD_REQUEST);
      }

      const user: User = await this.userRepository.create(body);

      return this.userRepository.save(user);
    } catch (err) {
      return {
        status: false,
        message: err.message,
        detail: err.detail || null,
      };
    }
  }

  async login(body: LoginDto): Promise<User | object> {
    try {
      const { credential, password } = body;

      const user: User | null = await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :credential', { credential: credential })
        .orWhere('user.username = :credential', { credential: credential })
        .getOne();

      if (!user) {
        throw new HttpException(
          'Credentials incorrect.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const isValidPass: boolean = await bcrypt.compare(
        password,
        user.password,
      );

      if (!isValidPass) {
        throw new HttpException(
          'Password is incorrect.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const token = await this.generateToken(user);

      return { user, access_token: token };
    } catch (err) {
      return {
        status: false,
        message: err.message,
      };
    }
  }

  async generateToken(user: User) {
    return this.jwtService.sign({ user });
  }

  async validateUser(user: any) {
    return await this.userRepository.findOneBy({ id: user.id });
  }

  async checkIfExpired(token: string): Promise<boolean> {
    try {
      this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (err) {
      return err.name == 'TokenExpiredError' ? true : false;
    }
  }

  async refreshToken(user: User) {
    return this.jwtService.signAsync(user);
  }
}
