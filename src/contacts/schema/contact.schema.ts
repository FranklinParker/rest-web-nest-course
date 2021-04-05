import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';
import { Message } from './Message.schema';

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  validateBeforeSave: true,
  strict: true,
})
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
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Message.name }] })
  messages: Message[];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Message.name })
  message: any;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);

ContactSchema.virtual('nameEmail').get(function () {
  return this.name + ' ' + this.email;
});
