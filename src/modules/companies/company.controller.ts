import { Controller, Get, Param } from '@nestjs/common';
import { ICompanyUseCase } from '@modules/companies/usecases/i.company.usecase';
import { Public } from '@common/decorators/roles.decorator';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: ICompanyUseCase) {}

  @Get("companies/:id/profile")
  @Public()
  getCompanyProfile(@Param("id") userId: number) {
    return this.companyService.getCompanyProfile(userId);
  }
}