import { IValidator } from '@utils/interfaces/IValidator';

const check = /[0-9][^a-z][^A-Z]/;

export const mobileValidator: IValidator = {
  validate(data: string): boolean {
    return check.test(data);
  },
};
