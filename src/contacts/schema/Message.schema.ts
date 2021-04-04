import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, Length } from 'class-validator';

@Schema()
export class Message extends Document {
  @IsNotEmpty()
  @Length(4, 25)
  @Prop()
  text: string;

  @IsNotEmpty()
  @Length(4, 25)
  @Prop()
  description: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
