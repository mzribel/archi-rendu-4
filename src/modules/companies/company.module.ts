import { Module } from "@nestjs/common";
import { CompanyProfileService } from "./company.service";
import { PrismaCompanyProfileRepository } from "./repositories/prisma.company-profile.repository";
import { CompanyController } from '@modules/companies/company.controller';
import { ICompanyUseCase } from '@modules/companies/usecases/i.company.usecase';

@Module({
  controllers: [CompanyController],
  providers:[
    CompanyProfileService,
    PrismaCompanyProfileRepository,
    { provide: ICompanyUseCase, useExisting: CompanyProfileService},
  ],
  exports: [ICompanyUseCase]
})
export class CompanyModule {}