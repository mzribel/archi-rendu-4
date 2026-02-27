import { ConflictException, Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaCompanyProfileRepository } from "./repositories/prisma.company-profile.repository";
import { ICompanyUseCase } from '@modules/companies/usecases/i.company.usecase';
import { CompanyProfile, CreateCompanyInput } from '@modules/companies/models/company-profile';
import { CreateCompanyProfileDto, UpdateCompanyProfileDto } from './dto/company-profile.dto';

@Injectable()
export class CompanyProfileService implements ICompanyUseCase {
    constructor(
        private readonly companyProfileRepository: PrismaCompanyProfileRepository
    ){}

  async createCompanyProfile(userId: number, dto: CreateCompanyProfileDto): Promise<CompanyProfile> {
    if (dto.siret) {
      const existsBySiret = await this.companyProfileRepository.existsBySiret(dto.siret);
      if (existsBySiret) {
        throw new ConflictException("A company with this SIRET has already been registered");
      }
    }

    const input: CreateCompanyInput = {
      userId,
      legalName: dto.legalName,
      industry: dto.industry as any,
      siret: dto.siret ?? null,
      description: ""
    };

    return this.companyProfileRepository.createProfile(input);
  }

  async getCompanyProfile(userId:number) {
    return await this.companyProfileRepository.findByUserId(userId);
  }

  updateCompanyProfile(userId:number, payload:UpdateCompanyProfileDto) {
    throw new NotImplementedException("Method not implemented.")
  }

  requestCompanyVerification(userId:number) {
    throw new NotImplementedException("Method not implemented.")
  }
}