import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { passwordValidator } from '@utils/validation/passwordValidator';
import { mobileValidator } from '@utils/validation/mobileValidator';
import { ValidateIf } from '@utils/validation/ValidateIf';

export class RegisterUserDTO {
  @IsString()
  @IsNotEmpty()
  public readonly username: string;

  @IsString()
  @IsNotEmpty()
  public readonly fullName: string;

  @IsEmail()
  public readonly email: string;

  @ValidateIf(password => passwordValidator.validate(password), { message: 'password is not valid' })
  @IsString()
  @IsNotEmpty()
  public readonly password: string;

  @ValidateIf(mobile => mobileValidator.validate(mobile), { message: 'mobile is not valid' })
  @IsString()
  @IsNotEmpty()
  public readonly mobile: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf(role => role === 'planner' || role === 'creator', { message: 'role is not valid' })
  public readonly role: 'planner' | 'creator';
}
