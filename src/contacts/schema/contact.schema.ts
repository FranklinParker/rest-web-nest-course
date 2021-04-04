import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';
import mongoose from 'mongoose';

@Schema()
export class Contact extends Document {
  @IsNotEmpty()
  @Length(3, 25)
  @Prop()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  @Prop({ unique: true })
  email: string;
  @IsPhoneNumber('US')
  @Prop()
  phone: string;
  @Prop()
  city: string;
  @Prop()
  state: string;
  @Prop()
  country: string;
  @Prop()
  messages: [{ type: mongoose.Schema.Types.ObjectId; ref: 'Message' }];
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
