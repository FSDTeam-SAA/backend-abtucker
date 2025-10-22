import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DisplaySideController } from './display-side.controller';
import { DisplaySideService } from './display-side.service';
import { DisplaySite, DisplaySchema } from './display-side.schema';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DisplaySite.name, schema: DisplaySchema },
    ]),
  ],
  controllers: [DisplaySideController],
  providers: [DisplaySideService, UploadService],
})
export class DisplaySideModule {}
