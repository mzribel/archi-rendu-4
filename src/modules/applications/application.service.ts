import { Injectable, NotImplementedException } from '@nestjs/common';
import { IApplicationUseCase } from '@modules/applications/usecases/i.application.usecase';
import { PrismaApplicationRepository } from '@modules/applications/repositories/prisma.application.repository';

@Injectable()
export class ApplicationService implements IApplicationUseCase {
  constructor(private readonly applicationRepository: PrismaApplicationRepository) {}

  apply(studentId:string, payload:any) {
    throw new NotImplementedException("Method not implemented.")
  }
  cancelApplication(studentId:string, applicationId:string){
    throw new NotImplementedException("Method not implemented.")
  }

  getApplicationsByStudentId(studentId:string){
    throw new NotImplementedException("Method not implemented.")
  }

  getApplicationsByOfferId(offerId:string){
    throw new NotImplementedException("Method not implemented.")
  }

  updateApplicationOffer(companyId:string, applicationId:string, newStatus:any) {
    throw new NotImplementedException("Method not implemented.")
  }
}