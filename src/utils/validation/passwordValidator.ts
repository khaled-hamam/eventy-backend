import * as PasswordValidator from 'password-validator';
import { IValidator } from '../interfaces/IValidator';

function createSchema(environment: string): IValidator {
  if (environment === 'development') {
    return new PasswordValidator()
      .is()
      .min(3)
      .is()
      .max(20)
      .has()
      .not()
      .spaces();
  } else {
    return new PasswordValidator()
      .is()
      .min(6)
      .is()
      .max(20)
      .has()
      .uppercase()
      .has()
      .lowercase()
      .has()
      .not()
      .spaces()
      .has()
      .digits();
  }
}

export const passwordValidator: IValidator = createSchema(process.env.NODE_ENV || 'development');
