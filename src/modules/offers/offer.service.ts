import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaOfferRepository } from '@modules/offers/repositories/prisma.offer.repository';
import { IOfferUsecase } from '@modules/offers/usecases/i.offer.usecase';

@Injectable()
export class OfferService implements IOfferUsecase {
  constructor(private readonly offerRepository: PrismaOfferRepository) {}

  getOffersByCompanyId(companyId:string) {
    throw new NotImplementedException("Method not implemented.");
  }

  getOfferById(offerId:string){
    throw new NotImplementedException("Method not implemented.");
  }

  createOffer(companyId:string, payload:any){
    throw new NotImplementedException("Method not implemented.");
  }

  updateOffer(offerId:string, payload:any){
    throw new NotImplementedException("Method not implemented.");
  }

  closeOffer(offerId:string){
    throw new NotImplementedException("Method not implemented.");
  }

  deleteOffer(offerId:string){
    throw new NotImplementedException("Method not implemented.");
  }

  searchOffer(filters:any){
    throw new NotImplementedException("Method not implemented.");
  }

}