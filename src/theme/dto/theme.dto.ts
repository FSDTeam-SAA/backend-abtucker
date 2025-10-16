import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateThemeDto {
  @IsArray()
  @IsString({ each: true })
  color: string[];

  @IsOptional()
  @IsString()
  logo?: string; // URL after upload
}
