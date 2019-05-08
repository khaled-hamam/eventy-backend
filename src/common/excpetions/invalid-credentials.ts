import { HttpException, HttpStatus } from '@nestjs/common';
import { createHttpExceptionBody } from '@utils/http-exception-body.util';

export class InvalidCredentialsException extends HttpException {
  constructor(message?: string | object | any, error = 'Bad Request') {
    super(
      createHttpExceptionBody(message || 'Invalid Email or Password.', error, HttpStatus.BAD_REQUEST),
      HttpStatus.BAD_REQUEST,
    );
  }
}
