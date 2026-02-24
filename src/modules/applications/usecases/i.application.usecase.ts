export abstract class IApplicationUseCase {
  abstract apply(studentId:string, payload:any);
  abstract cancelApplication(studentId:string, applicationId:string);
  abstract getApplicationsByStudentId(studentId:string);
  abstract getApplicationsByOfferId(offerId:string);
  abstract updateApplicationOffer(companyId:string, applicationId:string, newStatus:any);
}