import { RegisterCompanyDto, RegisterStudentDto } from '@modules/account/dto/register.dto';

export abstract class IAccountUseCase {
  abstract registerStudent(dto:RegisterStudentDto);
  abstract registerCompany(dto:RegisterCompanyDto);
  abstract getAccount(userId:number);
  abstract updateAccount(userId:number, payload:any);
  abstract deleteAccount(userId:number);
}