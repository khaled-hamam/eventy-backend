import { IValidator } from '@utils/interfaces/IValidator';

export const mobileValidator: IValidator = {
  validate(data: string): boolean {
    const check = /^(01)[0-9]{9}$/;
    return check.test(data);
  },
};
