import { User } from '@modules/users/models/user';
import { Offer } from '@modules/offers/models/Offer';

export abstract class IOfferUsecase {
  abstract getVisibleOffersByCompanyId(companyId:number, requestingUser:User);
  abstract getOffersByCompanyId(companyId:number, requestingUser:User);
  abstract getOfferById(offerId:number, requestingUser:User|null);
  abstract createOffer(companyId:number, payload:any, requestingUser:User);
  abstract updateOffer(offerId:number, payload:any, requestingUser:User);
  abstract closeOffer(offerId:number, requestingUser:User);
  abstract deleteOffer(offerId:number, requestingUser:User);
  abstract searchOffer(filters:any, requestingUser:User);
  abstract publishOffer(offerId:number, requestingUser:User);

  abstract getOfferForApplication(offerId:number):Promise<Offer>;

  abstract getVisibleOffers(requestingUser:User):Promise<Offer[]>;

}