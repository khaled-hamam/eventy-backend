import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { mobileValidator } from '@utils/validation/mobileValidator';
import { ValidateIf } from '@utils/validation/ValidateIf';

export class EditUserProfileDTO {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public fullName: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf(mobile => mobileValidator.validate(mobile), { message: 'mobile is not valid' })
  public mobile: string;

  @IsString()
  public pictureURL: string;
}
