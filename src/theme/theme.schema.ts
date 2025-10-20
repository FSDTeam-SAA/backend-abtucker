import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ThemeDocument = Theme & Document;

@Schema()
export class Theme {
  @Prop({ type: [String], default: [] })
  color: string[];

  @Prop({ type: String })
  logo: string;

  @Prop({ type: [String] })
  backgroundColor: string[];

  @Prop({ type: [String] })
  catImage: string[];

  @Prop({ type: String })
  heroImage: string;
}

export const ThemeSchema = SchemaFactory.createForClass(Theme);
