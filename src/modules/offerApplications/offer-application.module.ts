import { Module } from '@nestjs/common';
import { OfferApplicationController } from '@modules/offerApplications/offer-application.controller';
import { IOfferApplicationUsecase } from '@modules/offerApplications/usecases/i.offer-application.usecase';
import { OfferApplicationService } from '@modules/offerApplications/offer-application.service';
import { PrismaOfferApplicationRepository } from '@modules/offerApplications/repositories/prisma.offer-application.repository';
import { StudentModule } from '@modules/students/student.module';
import { OfferModule } from '@modules/offers/offer.module';

@Module({
  imports: [OfferModule, StudentModule],
  controllers: [OfferApplicationController],
  providers:[
    OfferApplicationService,
    PrismaOfferApplicationRepository,
    { provide:IOfferApplicationUsecase, useClass: OfferApplicationService },
  ],
  exports:[IOfferApplicationUsecase]
})
export class OfferApplicationModule {}