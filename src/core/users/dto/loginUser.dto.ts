import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { passwordValidator } from '@utils/validation/passwordValidator';

export class LoginUserDTO {
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf(passwordValidator.validate)
  public readonly password: string;
}
