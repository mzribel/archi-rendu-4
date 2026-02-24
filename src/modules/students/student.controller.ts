import { IStudentUseCase } from '@modules/students/usecases/i.student.usecase';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: IStudentUseCase) {}

  @Get("/:userId")
  getStudentProfile(@Param("userId") userId: string) {
    return this.studentService.getStudentProfile(userId);
  }
}