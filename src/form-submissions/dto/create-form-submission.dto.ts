import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFormSubmissionDto {
  @IsString()
  @IsNotEmpty()
  childName: string;

  @IsNumber()
  age: number;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  serial: number;

  @IsString()
  @IsNotEmpty()
  quote: string;

  @IsEnum(['active', 'deactivate'])
  status: string;
}
