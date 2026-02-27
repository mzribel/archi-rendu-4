export abstract class IStudentUseCase {
  abstract getStudentProfile(userId:number);
  abstract createStudentProfile(userId:number, payload:any);
  abstract updateStudentProfile(userId:number, payload:any);
  abstract setProfileVisibility(userId:number, isVisible:boolean);
  abstract searchStudentProfiles(filters:any);
}