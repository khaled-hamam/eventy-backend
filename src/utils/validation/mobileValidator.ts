import { IValidator } from '@utils/interfaces/IValidator';

const check = /^(01)[0-9]{9}$/;

export const mobileValidator: IValidator = {
  validate(data: string): boolean {
    return check.test(data);
  },
};
