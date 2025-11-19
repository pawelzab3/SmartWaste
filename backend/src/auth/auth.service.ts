import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Niepoprawny email lub hasło');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedException('Niepoprawny email lub hasło');
    }

    return {
      token: this.jwt.sign({ id: user.id, email: user.email }),
    };
  }

  async register(email: string, password: string) {
    const existing = await this.users.findByEmail(email);

    if (existing) {
      throw new UnauthorizedException('Użytkownik już istnieje');
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await this.users.create({
      email,
      password: hashed,
    });

    return {
      message: 'Konto utworzone',
      token: this.jwt.sign({ id: newUser.id, email: newUser.email }),
    };
  }  
}
