import { Controller } from '@nestjs/common';
import { ICompanyUseCase } from '@modules/companies/usecases/i.company.usecase';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: ICompanyUseCase) {}
}