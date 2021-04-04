import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

export class ContactDto {
  @IsNotEmpty()
  @Length(3, 25)
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsPhoneNumber('US')
  phone: string;
  city: string;
  state: string;
  country: string;
  messages?: any[];
}
