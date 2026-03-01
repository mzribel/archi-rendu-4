import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ICompanyUseCase } from '@modules/companies/usecases/i.company.usecase';
import { Public } from '@common/decorators/roles.decorator';
import { CurrentUser } from '@common/decorators/user.decorator';
import { User } from '@modules/users/models/user';
import { CreateCompanyProfileDto, UpdateCompanyProfileDto } from '@modules/companies/dto/company-profile.dto';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: ICompanyUseCase) {}

  @Get("companies/:id/profile")
  @Public()
  getCompanyProfile(@Param("id") userId: number) {
    return this.companyService.getCompanyProfile(userId);
  }

  @Patch("companies/:id/profile")
  updateCompanyProfile(@Param("id") userId: number, @Body() dto:UpdateCompanyProfileDto, @CurrentUser() requestingUser:User) {
    return this.companyService.updateCompanyProfile(userId, dto, requestingUser);
  }
}