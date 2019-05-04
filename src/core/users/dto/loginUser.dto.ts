import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ValidateIf } from '@utils/validation/ValidateIf';
import { passwordValidator } from '@utils/validation/passwordValidator';

export class LoginUserDTO {
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf(password => passwordValidator.validate(password), { message: 'password is not valid' })
  public readonly password: string;
}
