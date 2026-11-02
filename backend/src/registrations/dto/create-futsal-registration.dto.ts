
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateFutsalRegistrationDto {
  @IsString()
  @IsNotEmpty()
  teamName: string;

  @IsString()
  @IsNotEmpty()
  school: string;

  @IsString()
  @IsNotEmpty()
  whatsapp: string;
}
