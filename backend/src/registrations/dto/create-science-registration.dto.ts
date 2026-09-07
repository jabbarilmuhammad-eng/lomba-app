import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

export enum ScienceField {
  MATEMATIKA = 'MATEMATIKA',
  IPA = 'IPA',
  IPS = 'IPS',
}

export enum RegistrationType {
  SELF = 'SELF',
  COLLECTIVE = 'COLLECTIVE',
}

export class ScienceParticipantDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  school: string;

  @IsEnum(ScienceField)
  field: ScienceField;
}

export class CreateScienceRegistrationDto {
  @IsEnum(RegistrationType)
  type: RegistrationType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScienceParticipantDto)
  participants: ScienceParticipantDto[];
}