import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

@Schema()
export class Contact extends Document {
  @IsNotEmpty()
  @Length(3, 25)
  @Prop()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  @Prop()
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
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
