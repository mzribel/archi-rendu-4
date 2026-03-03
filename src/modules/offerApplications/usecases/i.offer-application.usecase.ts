import { User } from '@modules/users/models/user';
import {
  CreateOfferApplicationDto,
  UpdateOfferApplicationDto,
} from '@modules/offerApplications/dto/offer-application.dto';

export abstract class IOfferApplicationUsecase {
  abstract apply(offerId:number, dto:CreateOfferApplicationDto, requestingUser:User);
  abstract cancelApplication(applicationId:number, requestingUser:User);
  abstract getApplicationsByStudentId(studentId:number, requestingUser:User);
  abstract getApplicationsByOfferId(offerId:number, requestingUser:User);
  abstract updateOfferApplicationStatus(applicationId: number, newStatus: any, requestingUser:User);
  abstract updateApplication(applicationId:number, dto:UpdateOfferApplicationDto, requestingUser:User);
  abstract deleteApplication(applicationId:number, requestingUser:User);
}