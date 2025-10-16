import { IsArray, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateThemeDto {
  @IsArray()
  @IsString({ each: true })
  color: string[];

  @IsOptional()
  @IsString()
  logo?: string; // URL after upload
}
