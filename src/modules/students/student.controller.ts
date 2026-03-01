import { IStudentUseCase } from '@modules/students/usecases/i.student.usecase';
import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { CurrentUser } from '@common/decorators/user.decorator';
import { User } from '@modules/users/models/user';
import { UpdateCompanyProfileDto } from '@modules/companies/dto/company-profile.dto';

@Controller()
export class StudentController {
  constructor(private readonly studentService: IStudentUseCase) {}

  @Get("students/:userId/profile")
  getStudentProfile(@Param("userId") userId: number, @CurrentUser() requestingUser:User) {
    return this.studentService.getStudentProfile(userId);
  }

  @Patch("students/:userId/profile")
  updateCompanyProfile(@Param("userId") userId: number, @Body() dto:UpdateCompanyProfileDto, @CurrentUser() requestingUser:User) {
    return this.studentService.updateStudentProfile(userId, dto, requestingUser);
  }
}