import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class EditUserProfileDTO {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public fullName: string;

  @IsString()
  @IsNotEmpty()
  public mobile: string;

  @IsString()
  public pictureURL: string;
}
