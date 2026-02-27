import { IsDefined, IsEmail, IsNotEmpty, Validate, ValidateNested } from 'class-validator';
import { CreateCompanyProfileDto } from '@modules/companies/dto/create-company-profile.dto';
import { CreateStudentProfileDto } from '@modules/students/dto/create-student-profile.dto';

export class RegisterDto {
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    password!:string;
}

export class RegisterCompanyDto extends RegisterDto {
  @IsDefined()
  @ValidateNested()
  profile: CreateCompanyProfileDto
}

export class RegisterStudentDto extends RegisterDto {
  profile: CreateStudentProfileDto
}