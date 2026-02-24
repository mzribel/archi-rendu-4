export abstract class IOfferUsecase {
  abstract getOffersByCompanyId(companyId:string);
  abstract getOfferById(offerId:string);
  abstract createOffer(companyId:string, payload:any);
  abstract updateOffer(offerId:string, payload:any);
  abstract closeOffer(offerId:string);
  abstract deleteOffer(offerId:string);
  abstract searchOffer(filters:any);
}