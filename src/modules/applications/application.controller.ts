import { Controller, Post, Body, Param, Delete, Get, UnauthorizedException } from '@nestjs/common';
import { IApplicationUseCase } from '@modules/applications/usecases/i.application.usecase';
import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { User } from '@modules/users/models/user';
import { Role } from '@modules/users/dto/user.dto';

@Controller()
export class ApplicationController {
  constructor(private readonly applicationService: IApplicationUseCase) {}

  @Post("offers/:offerId/apply")
  apply(@Param("offerId") offerId:string, @Body() applicationDto:any){
    return this.applicationService.apply(offerId, applicationDto);
  }

  @Delete("applications/:applicationId")
  cancelApplication(@Param("applicationId") applicationId:string, @CurrentUser() user:User) {
    return this.applicationService.cancelApplication(user.id.toString(), applicationId);
  }

  @Roles(Role.ETUDIANT, Role.ADMIN)
  @Get("/students/:userId/applications")
  getApplicationsByStudentId(@Param("userId") userId:string, @CurrentUser() user:User){
    if (user.role != Role.ADMIN && user.id.toString() != userId) {
      throw new UnauthorizedException();
    }
    return this.applicationService.getApplicationsByStudentId(userId);
  }

  @Roles(Role.ENTREPRISE)
  @Get("offers/:offerId/applications")
  getApplicationByOfferId(@Param("offerId") offerId:string, @CurrentUser() user:User){
    return
  }

}