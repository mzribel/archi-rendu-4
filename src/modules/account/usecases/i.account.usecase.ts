import { RegisterCompanyDto, RegisterStudentDto } from '@modules/account/dto/register.dto';
import { User } from '@/modules/users/models/user';
import { AccountResponseDto } from '../dto/account.response.dto';

export abstract class IAccountUseCase {
  abstract registerStudent(dto:RegisterStudentDto);
  abstract registerCompany(dto:RegisterCompanyDto);
  abstract getAccount(userId:number, requestingUser:User):Promise<AccountResponseDto>;
  abstract deleteAccount(userId:number, requestingUser:User):Promise<void>;
}