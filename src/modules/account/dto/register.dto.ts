import { IsDefined, IsEmail, IsNotEmpty, Validate, ValidateNested } from 'class-validator';
import { CreateStudentProfileDto } from '@modules/students/dto/create-student-profile.dto';
import { CreateCompanyProfileDto } from '@/modules/companies/dto/company-profile.dto';

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