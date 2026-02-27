import { CreateCompanyProfileDto } from '@modules/companies/dto/create-company-profile.dto';

export abstract class ICompanyUseCase {
  abstract createCompanyProfile(userId:number, payload:CreateCompanyProfileDto);
  abstract getCompanyProfile(userId:number);
  abstract updateCompanyProfile(userId:number, payload:any);
  abstract requestCompanyVerification(userId:number);
}