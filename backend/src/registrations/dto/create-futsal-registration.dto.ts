import {
  ArrayMinSize,
  IsArray,
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

  @IsArray()
  @ArrayMinSize(1)
  members: string[];
}