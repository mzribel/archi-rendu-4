import { User } from '@modules/users/models/user';

export abstract class IStudentUseCase {
  abstract getStudentProfile(userId:number);
  abstract createStudentProfile(userId:number, payload:any);
  abstract updateStudentProfile(userId:number, payload:any, requestingUser:User);
  abstract setProfileVisibility(userId:number, isVisible:boolean, requestingUser:User);
  abstract searchStudentProfiles(filters:any);
}