export abstract class IStudentUseCase {
  abstract getStudentProfile(userId:string);
  abstract createStudentProfile(userId:string, payload:any);
  abstract updateStudentProfile(userId:string, payload:any);
  abstract setProfileVisibility(userId:string, isVisible:boolean);
  abstract searchStudentProfiles(filters:any);
}