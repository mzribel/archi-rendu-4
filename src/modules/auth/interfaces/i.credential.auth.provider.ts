export abstract class ICredentialAuthProvider {
  abstract registerWithPassword(input: { email: string; password: string }): Promise<{ externalUserId: string; email?: string }>;
  abstract loginWithPassword(input: { email: string; password: string }): Promise<{ externalUserId: string; email?: string }>;
  abstract deleteUser(authId:string);
}