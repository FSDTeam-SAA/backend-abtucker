import { IsEnum } from 'class-validator';

export class UpdateStatusDto {
  @IsEnum(['active', 'deactivate'])
  status: 'active' | 'deactivate';
}
