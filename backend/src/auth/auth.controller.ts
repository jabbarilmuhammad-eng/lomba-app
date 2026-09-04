import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { db } from '../prisma/db.js';

@Controller('api/auth')
export class AuthController {
  
  @Post('register')
  async register(@Body() body: RegisterDto) {
    const user = await db.orm.public.User.create({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    return {
      message: 'Register berhasil',
      data: user,
    };
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const users = await db.orm.public.User
      .where({
        email: body.email,
      })
      .all();

    const user = users[0];

    if (!user) {
      throw new UnauthorizedException('Email atau password salah');
    }

    if (user.password !== body.password) {
      throw new UnauthorizedException('Email atau password salah');
    }

    return {
      message: 'Login berhasil',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}