import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegistrationsService } from './registrations.service.js';
import { CreateScienceRegistrationDto } from './dto/create-science-registration.dto.js';
import { CreateFutsalRegistrationDto } from './dto/create-futsal-registration.dto.js';

@Controller('registrations')
export class RegistrationsController {
  constructor(
    private readonly registrationsService: RegistrationsService,
  ) {}

  @Get()
  getRegistrations() {
    return this.registrationsService.getRegistrations();
  }

  @Post('science')
  createScienceRegistration(
    @Body() dto: CreateScienceRegistrationDto,
  ) {
    return this.registrationsService.createScienceRegistration(dto);
  }

  @Post('futsal')
  createFutsalRegistration(
    @Body() dto: CreateFutsalRegistrationDto,
  ) {
    return this.registrationsService.createFutsalRegistration(dto);
  }
}