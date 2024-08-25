import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private zodType: ZodType) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    // PIPE hati2 di level method,class,atau global
    // jika body divalidasi
    if (metadata.type == 'body') {
      return this.zodType.parse(value);
    } else {
      return value;
    }
  }
}
