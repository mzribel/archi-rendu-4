import { Module } from '@nestjs/common';
import { StudentController } from '@modules/students/student.controller';
import { IStudentUseCase } from '@modules/students/usecases/i.student.usecase';
import { StudentService } from '@modules/students/student.service';
import { PrismaStudentProfileRepository } from '@modules/students/repositories/prisma.student-profile.repository';

@Module({
  imports: [],
  controllers: [StudentController],
  providers:[
    PrismaStudentProfileRepository,
    StudentService,
    { provide:IStudentUseCase, useClass: StudentService },
  ],
  exports:[IStudentUseCase]
})
export class StudentModule {}