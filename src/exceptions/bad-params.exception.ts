import { HttpException, HttpStatus } from "@nestjs/common";

export class BadParamsException extends HttpException {
  constructor(message: string) {
    super({ statusCode: HttpStatus.BAD_REQUEST, message, error: 'Bad Params' }, HttpStatus.BAD_REQUEST);
  }
}
