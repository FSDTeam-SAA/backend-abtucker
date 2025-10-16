import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FormSubmissionDocument = FormSubmission & Document;

@Schema({ timestamps: true })
export class FormSubmission {
  @Prop({ required: true })
  childName: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  serial: number;

  @Prop({ required: true })
  quote: string;

  @Prop({ required: true, enum: ['active', 'deactivate'], default: 'active' })
  status: string;

  @Prop([String]) // store multiple photo URLs
  photos: string[];
}

export const FormSubmissionSchema =
  SchemaFactory.createForClass(FormSubmission);
