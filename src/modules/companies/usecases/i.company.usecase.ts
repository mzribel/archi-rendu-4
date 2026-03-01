import { CreateCompanyProfileDto, UpdateCompanyProfileDto } from '../dto/company-profile.dto';
import { User } from '@modules/users/models/user';

export abstract class ICompanyUseCase {
  abstract createCompanyProfile(userId:number, dto:CreateCompanyProfileDto);
  abstract getCompanyProfile(userId:number);
  abstract updateCompanyProfile(userId: number, dto: Partial<UpdateCompanyProfileDto>, requestingUser:User);
  // abstract requestCompanyVerification(userId:number);
}