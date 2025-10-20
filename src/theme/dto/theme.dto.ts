import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateThemeDto {
  @IsArray()
  color: string[];

  @IsOptional()
  @IsString()
  logo?: string;

  @IsArray()
  @IsOptional()
  backgroundColor?: string[];

  @IsArray()
  @IsOptional()
  catImage?: string[];

  heroImage: string;
}
