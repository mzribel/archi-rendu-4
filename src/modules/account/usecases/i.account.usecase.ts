import { RegisterCompanyDto, RegisterStudentDto } from '@modules/account/dto/register.dto';
import { User } from '@/modules/users/models/user';
import { AccountDto } from '../dto/account.dto';

export abstract class IAccountUseCase {
  abstract registerStudent(dto:RegisterStudentDto);
  abstract registerCompany(dto:RegisterCompanyDto);
  abstract getAccount(userId:number, requestingUser:User):Promise<AccountDto>;
  abstract deleteAccount(userId:number, requestingUser:User):Promise<void>;
}