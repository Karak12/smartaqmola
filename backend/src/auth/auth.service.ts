import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  login(username: string, password: string) {
    const expectedUser = this.config.get<string>('auth.adminUsername');
    const hash = this.config.get<string>('auth.adminPasswordHash');
    const plain = this.config.get<string>('auth.adminPassword');

    // Если задан ADMIN_PASSWORD_HASH — сверяем bcrypt-хеш, иначе plain-пароль.
    const passOk = hash
      ? bcrypt.compareSync(password, hash)
      : password === plain;

    if (username !== expectedUser || !passOk) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }
    const token = this.jwt.sign({ sub: username, role: 'admin' });
    return { token, username };
  }
}
