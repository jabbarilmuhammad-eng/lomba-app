import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller.js';

@Module({
  imports: [
    JwtModule.register({
      secret:
        process.env.JWT_SECRET ||
        'armaso-secret-key',

      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],

  controllers: [
    AuthController,
  ],

  providers: [],

  exports: [
    JwtModule,
  ],
})
export class AuthModule {}