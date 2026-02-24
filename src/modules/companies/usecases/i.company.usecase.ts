export abstract class ICompanyUseCase {
  // TODO : Virer celle ci
  abstract createProfile(userId:number, legalName:string, siret:string)
  abstract createCompanyProfile(userId:string, payload:any);
  abstract getCompanyProfile(userId:string);
  abstract updateCompanyProfile(userId:string, payload:any);
  abstract requestCompanyVerification(userId:string);
}