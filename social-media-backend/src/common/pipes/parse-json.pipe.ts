import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseJsonPipe implements PipeTransform<string, any> {
  transform(value: string) {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }

    try {
      return JSON.parse(value);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Invalid JSON string for blocks');
    }
  }
}
