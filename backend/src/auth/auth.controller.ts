import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

import { db } from '../prisma/db.js';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const existingUsers =
      await db.orm.public.User
        .where({
          email: body.email,
        })
        .all();

    if (existingUsers.length > 0) {
      throw new ConflictException(
        'Email sudah terdaftar',
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        body.password,
        10,
      );

    const user =
      await db.orm.public.User.create({
        name: body.name,
        email: body.email,
        password: hashedPassword,
      });

    return {
      message: 'Register berhasil',

      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const users =
      await db.orm.public.User
        .where({
          email: body.email,
        })
        .all();

    const user = users[0];

    if (!user) {
      throw new UnauthorizedException(
        'Email atau password salah',
      );
    }

    const passwordMatch =
      await bcrypt.compare(
        body.password,
        user.password,
      );

    if (!passwordMatch) {
      throw new UnauthorizedException(
        'Email atau password salah',
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const accessToken =
      await this.jwtService.signAsync(
        payload,
      );

    return {
      message: 'Login berhasil',

      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },

      accessToken,
    };
  }
}