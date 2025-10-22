import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DisplayDocument = DisplaySite & Document;

@Schema({ timestamps: true })
export class DisplaySite {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  sideImage: string; // Will hold Cloudinary URL
}

export const DisplaySchema = SchemaFactory.createForClass(DisplaySite);
