import { Injectable } from '@nestjs/common';
import { RegisterCompanyDto } from './dto/register-company.dto';
import { Role } from '@prisma/client';
import { RegisterStudentDto } from './dto/register-student.dto';
import { PrismaTransactionRunner } from '@/infrastructure/database/prisma/prisma.transaction-runner';
import { IAuthUseCase } from '@modules/auth/usecases/i.auth.usecase';
import { IAccountUseCase } from '@modules/account/usecases/i.account.usecase';
import { ICompanyUseCase } from '@modules/companies/usecases/i.company.usecase';
import { IUserUseCase } from '@modules/users/usecases/i.user.usecase';

@Injectable()
export class AccountService implements IAccountUseCase {
  constructor(
    private readonly tx: PrismaTransactionRunner,
    private readonly authService: IAuthUseCase,
    private readonly userService: IUserUseCase,
    private readonly companyProfileService: ICompanyUseCase,
  ) {}

  async registerCompany(dto: RegisterCompanyDto) {
    const auth = await this.authService.registerWithPassword(
      dto.email,
      dto.password,
    );
    try {
      return await this.tx.run(async () => {
        const user = await this.userService.createUser(
          auth.externalUserId,
          dto.email ?? '',
          Role.ENTREPRISE,
        );
        await this.companyProfileService.createProfile(
          user.id,
          dto.legalName,
          dto.siret ?? '',
        );
        return user;
      });
    } catch (e) {
      await this.authService.deleteUser(auth.externalUserId);
      throw e;
    }
  }

  registerStudent(dto: RegisterStudentDto) {
    throw new Error('Method not implemented.');
  }

  getAccount(userId: string) {
    throw new Error('Method not implemented.');
  }
  updateAccount(userId: string, payload: any) {
    throw new Error('Method not implemented.');
  }
  deleteAccount(userId: string) {
    throw new Error('Method not implemented.');
  }
}