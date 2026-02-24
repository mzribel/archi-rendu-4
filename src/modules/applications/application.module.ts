import { Module } from '@nestjs/common';
import { ApplicationController } from '@modules/applications/application.controller';
import { IApplicationUseCase } from '@modules/applications/usecases/i.application.usecase';
import { ApplicationService } from '@modules/applications/application.service';
import { PrismaApplicationRepository } from '@modules/applications/repositories/prisma.application.repository';
import { OfferModule } from '@modules/offers/offer.module';
import { StudentModule } from '@modules/students/student.module';

@Module({
  imports: [OfferModule, StudentModule],
  controllers: [ApplicationController],
  providers:[
    ApplicationService,
    PrismaApplicationRepository,
    { provide:IApplicationUseCase, useClass: ApplicationService }
  ],
  exports:[IApplicationUseCase]
})
export class ApplicationModule {}