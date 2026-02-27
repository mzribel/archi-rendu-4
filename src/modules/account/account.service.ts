import { Injectable } from '@nestjs/common';
import { PrismaTransactionRunner } from '@/infrastructure/database/prisma/prisma.transaction-runner';
import { IAuthUseCase } from '@modules/auth/usecases/i.auth.usecase';
import { IAccountUseCase } from '@modules/account/usecases/i.account.usecase';
import { ICompanyUseCase } from '@modules/companies/usecases/i.company.usecase';
import { IUserUseCase } from '@modules/users/usecases/i.user.usecase';
import { Role } from '@common/enums/role.enum'
import { RegisterCompanyDto, RegisterStudentDto } from '@modules/account/dto/register.dto';

@Injectable()
export class AccountService implements IAccountUseCase {
  constructor(
    private readonly tx: PrismaTransactionRunner,
    private readonly authService: IAuthUseCase,
    private readonly userService: IUserUseCase,
    private readonly companyProfileService: ICompanyUseCase,
  ) {}

  async registerCompany(dto: RegisterCompanyDto) {
    // Utilisateur Supabase
    const auth = await this.authService.registerWithPassword(dto.email, dto.password);
    try {
      return await this.tx.run(async () => {
        // Utilisateur applicatif
        const user = await this.userService.createUser(auth.externalUserId, dto.email ?? '', Role.COMPANY,);
        // Profil de l'utilisateur
        await this.companyProfileService.createCompanyProfile(user.id, dto.profile);
        return user;
      });
    } catch (e) {
      // Supprime l'utilisateur Supabase si erreur dans le processus
      await this.authService.deleteUser(auth.externalUserId);
      throw e;
    }
  }

  registerStudent(dto: RegisterStudentDto) {
    throw new Error('Method not implemented.');
  }

  getAccount(userId: number) {
    throw new Error('Method not implemented.');
  }
  updateAccount(userId: number, payload: any) {
    throw new Error('Method not implemented.');
  }
  deleteAccount(userId: number) {
    throw new Error('Method not implemented.');
  }
}