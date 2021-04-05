import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsPhoneNumber,
  Length,
} from 'class-validator';

export class PartialUpdateDto {
  @Length(3, 25)
  name?: string;
  @IsEmpty()
  @IsEmail()
  email?: string;
  @IsEmpty()
  @IsPhoneNumber('US')
  phone?: string;
  city?: string;
  state?: string;
  country?: string;
  messages?: any[];
}
