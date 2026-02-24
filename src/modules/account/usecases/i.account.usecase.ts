import { RegisterStudentDto } from '@modules/account/dto/register-student.dto';
import { RegisterCompanyDto } from '@modules/account/dto/register-company.dto';

export abstract class IAccountUseCase {
  abstract registerStudent(dto:RegisterStudentDto);
  abstract registerCompany(dto:RegisterCompanyDto);
  abstract getAccount(userId:string);
  abstract updateAccount(userId:string, payload:any);
  abstract deleteAccount(userId:string);
}