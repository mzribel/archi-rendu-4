import { ConflictException, Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaCompanyProfileRepository } from "./repositories/prisma.company-profile.repository";
import { ICompanyUseCase } from '@modules/companies/usecases/i.company.usecase';

@Injectable()
export class CompanyProfileService implements ICompanyUseCase {
    constructor(
        private readonly companyProfileRepository: PrismaCompanyProfileRepository
    ){}

  async createProfile(userId:number, legalName:string, siret:string) {
    if (siret != "") {
      const existsBySiret = await this.companyProfileRepository.existsBySiret(siret);
      if (existsBySiret) throw new ConflictException("A company with this SIRET has already been registered")
    }

    return this.companyProfileRepository.createProfile(userId, legalName, siret);
  }

  createCompanyProfile(userId:string, payload:any) {
      throw new NotImplementedException("Method not implemented.")
  }
  getCompanyProfile(userId:string) {
    throw new NotImplementedException("Method not implemented.")
  }
  updateCompanyProfile(userId:string, payload:any) {
    throw new NotImplementedException("Method not implemented.")
  }
  requestCompanyVerification(userId:string) {
    throw new NotImplementedException("Method not implemented.")
  }
}