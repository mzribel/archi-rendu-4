import { IStudentUseCase } from '@modules/students/usecases/i.student.usecase';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaStudentProfileRepository } from '@modules/students/repositories/prisma.student-profile.repository';

@Injectable()
export class StudentService implements IStudentUseCase {
  constructor(
    private readonly profileRepository: PrismaStudentProfileRepository
  ){}

  getStudentProfile(userId:number){
    throw new NotImplementedException("Method not implemented.")
  };
  createStudentProfile(userId:number, payload:any) {
    throw new Error("Method not implemented.")
  }
  updateStudentProfile(userId:number, payload:any) {
    throw new Error("Method not implemented.")
  }
  setProfileVisibility(userId:number, isVisible:boolean) {
    throw new Error("Method not implemented.")
  }
  searchStudentProfiles(filters:any) {
    throw new Error("Method not implemented.")
  }
}