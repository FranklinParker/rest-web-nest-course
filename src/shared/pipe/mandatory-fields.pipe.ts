import { ArgumentMetadata, HttpException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class MandatoryFieldsPipe implements PipeTransform {
  constructor(private fields: string[]) {}
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') {
      return value;
    }
    console.log('value:', value);

    console.log('value Type:', typeof value);
    if (!value || typeof value !== 'object') {
      throw new HttpException('Payload must be an Object', 400);
    }
    let message = '';
    this.fields.forEach((field) => {
      if (field === 'name' && value[field] && value[field].length < 3) {
        message += 'Name must be 3 chars, ';
      }
    });
    if (message.length > 0) {
      throw new HttpException(message, 400);
    }
    return value;
  }
}
