import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { passwordValidator } from '@utils/passwordValidator';

export class RegisterUserDTO {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsEmail()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf(password => passwordValidator.validate(password))
  public readonly password: string;

  @IsString()
  @IsNotEmpty()
  public readonly mobile: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf(role => role === 'planner' || role === 'creator')
  public readonly role: 'planner' | 'creator';
}
