import { Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { IAuthUseCase } from '@modules/auth/usecases/i.auth.usecase';
import { ICredentialAuthProvider } from '@modules/auth/interfaces/i.credential.auth.provider';

@Injectable()
export class AuthService implements IAuthUseCase {
  constructor(
    private readonly credentialAuth: ICredentialAuthProvider,
  ) {}

  requestPasswordReset(email: string) {
    throw new NotImplementedException('Method not implemented.');
  }

  async registerWithPassword(email: string, password: string) {
    return this.credentialAuth.registerWithPassword({ email, password });
  }

  async loginWithPassword(email: string, password: string) {
    return await this.credentialAuth.loginWithPassword({ email, password });
  }

  async deleteUser(authId: string) {
    return this.credentialAuth.deleteUser(authId);
  }
}
