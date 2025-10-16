import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThemeService } from './theme.service';
import { ThemeController } from './theme.controller';
import { Theme, ThemeSchema } from './theme.schema';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Theme.name, schema: ThemeSchema }]),
  ],
  controllers: [ThemeController],
  providers: [ThemeService, UploadService],
})
export class ThemeModule {}
