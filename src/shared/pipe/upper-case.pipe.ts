import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UpperCasePipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    console.log('type:' + metadata.type);
    if (!value) {
      return value;
    }
    return value.toUpperCase();
  }
}
