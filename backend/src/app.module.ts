import { Module } from '@nestjs/common';

import { AppController } from './app.controller.js';

import { AppService } from './app.service.js';

import { AuthController } from './auth/auth.controller.js';

import { RegistrationsModule } from './registrations/registration.module.js';

import { PaymentsModule } from './payments/payments.module.js';

@Module({
  imports: [
    RegistrationsModule,
    PaymentsModule,
  ],

  controllers: [
    AppController,
    AuthController,
  ],

  providers: [AppService],
})
export class AppModule {}