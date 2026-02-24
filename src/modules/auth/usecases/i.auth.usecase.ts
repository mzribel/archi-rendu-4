export abstract class IAuthUseCase {
  abstract registerWithPassword(email: string, password: string);
  abstract loginWithPassword(email: string, password: string);
  abstract requestPasswordReset(email: string);
  abstract deleteUser(externalUserId: string);
}