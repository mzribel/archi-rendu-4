import { CreateCompanyProfileDto, UpdateCompanyProfileDto } from "../dto/company-profile.dto";

export abstract class ICompanyUseCase {
  abstract createCompanyProfile(userId:number, payload:CreateCompanyProfileDto);
  abstract getCompanyProfile(userId:number);
  abstract updateCompanyProfile(userId:number, payload:UpdateCompanyProfileDto);
  abstract requestCompanyVerification(userId:number);
}