import { ArgumentMetadata, HttpException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class MandatoryFieldsPipe implements PipeTransform {
  constructor(private fields: string[]) {}
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || typeof value === 'object') {
      throw new HttpException('Payload must be an Object', 400);
    }
    const missingFields = [];
    this.fields.forEach((field) => {
      if (!value[field]) {
        missingFields.push(field);
      }
    });
    if (missingFields.length > 0) {
      throw new HttpException(
        `Missing fields  ${missingFields.join(', ')}`,
        400,
      );
    }
    return value;
  }
}
