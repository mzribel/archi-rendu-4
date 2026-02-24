import { OfferController } from '@modules/offers/offer.controller';
import { IOfferUsecase } from '@modules/offers/usecases/i.offer.usecase';
import { OfferService } from '@modules/offers/offer.service';
import { Module } from '@nestjs/common';
import { PrismaOfferRepository } from '@modules/offers/repositories/prisma.offer.repository';
import { CompanyModule } from '@modules/companies/company.module';

@Module({
  imports: [CompanyModule],
  controllers: [OfferController],
  providers:[
    OfferService,
    PrismaOfferRepository,
    { provide:IOfferUsecase, useClass: OfferService },
  ],
  exports:[IOfferUsecase]
})
export class OfferModule {}