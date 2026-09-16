import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import type { Request } from 'express';

import { RegistrationsService } from './registrations.service.js';

import { CreateScienceRegistrationDto } from './dto/create-science-registration.dto.js';

import { CreateFutsalRegistrationDto } from './dto/create-futsal-registration.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

import { AuthUser } from '../auth/auth-user.interface.js';

interface AuthenticatedRequest extends Request {
  user: AuthUser;
}

@Controller('registrations')
export class RegistrationsController {
  constructor(
    private readonly registrationsService: RegistrationsService,
  ) {}

  @Get()
  getRegistrations() {
    return this.registrationsService.getRegistrations();
  }

  @Get('futsal')
  getFutsalRegistrations() {
    return this.registrationsService.getFutsalRegistrations();
  }

  @Post('science')
  @UseGuards(JwtAuthGuard)
  createScienceRegistration(
    @Body() dto: CreateScienceRegistrationDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.registrationsService.createScienceRegistration(
      dto,
      req.user,
    );
  }

  @Post('futsal')
  @UseGuards(JwtAuthGuard)
  createFutsalRegistration(
    @Body() dto: CreateFutsalRegistrationDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.registrationsService.createFutsalRegistration(
      dto,
      req.user,
    );
  }
}