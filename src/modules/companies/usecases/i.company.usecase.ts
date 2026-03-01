import { CreateCompanyProfileDto, UpdateCompanyProfileDto } from '../dto/company-profile.dto';
import { User } from '@modules/users/models/user';
import { CompanyProfile } from '@modules/companies/models/company-profile';

export abstract class ICompanyUseCase {
  abstract createCompanyProfile(userId:number, dto:CreateCompanyProfileDto):Promise<CompanyProfile>;
  abstract getCompanyProfile(userId:number):Promise<CompanyProfile>;
  abstract getCompanyProfileOrNull(userId:number):Promise<CompanyProfile|null>;
  abstract updateCompanyProfile(userId: number, dto: Partial<UpdateCompanyProfileDto>, requestingUser:User):Promise<CompanyProfile>;
  // abstract requestCompanyVerification(userId:number);
}