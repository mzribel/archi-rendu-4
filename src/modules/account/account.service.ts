import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaTransactionRunner } from '@/infrastructure/database/prisma/prisma.transaction-runner';
import { IAuthUseCase } from '@modules/auth/usecases/i.auth.usecase';
import { IAccountUseCase } from '@modules/account/usecases/i.account.usecase';
import { ICompanyUseCase } from '@modules/companies/usecases/i.company.usecase';
import { IUserUseCase } from '@modules/users/usecases/i.user.usecase';
import { Role } from '@common/enums/role.enum'
import { RegisterCompanyDto, RegisterDto, RegisterStudentDto } from '@modules/account/dto/register.dto';
import { User } from "@modules/users/models/user"
import { AccountDto, CompanyAccountDto, StudentAccountDto } from './dto/account.dto';
import { IStudentUseCase } from '../students/usecases/i.student.usecase';

@Injectable()
export class AccountService implements IAccountUseCase {
  constructor(
    private readonly tx: PrismaTransactionRunner,
    private readonly authService: IAuthUseCase,
    private readonly userService: IUserUseCase,
    private readonly companyProfileService: ICompanyUseCase,
    private readonly studentProfileService: IStudentUseCase
  ) {}


  private async createBaseUser(dto: RegisterDto, role:Role) {
    // Utilisateur supabase
    const auth = await this.authService.registerWithPassword(dto.email, dto.password);
  
    // Utilisateur applicatif
    try {
      const user = await this.userService.createUser(auth.externalUserId, dto.email ?? '', role);
      return { auth, user };
    } catch (e) {
      await this.authService.deleteUser(auth.externalUserId);
      throw e;
    }
  }

  async registerCompany(dto: RegisterCompanyDto) {
    const { auth, user } = await this.createBaseUser(dto, Role.COMPANY);
    
    try {
      return await this.tx.run(async () => {
        await this.companyProfileService.createCompanyProfile(user.id, dto.profile);
        return user;
      });
    } catch (e) {
      await this.authService.deleteUser(auth.externalUserId);
      throw e;
    }
  }

  async registerStudent(dto: RegisterStudentDto) {
    const { auth, user } = await this.createBaseUser(dto, Role.STUDENT);
    
    try {
      return await this.tx.run(async () => {
        // 3. Spécifique étudiant
        await this.studentProfileService.createStudentProfile(user.id, dto.profile);
        return user;
      });
    } catch (e) {
      await this.authService.deleteUser(auth.externalUserId);
      throw e;
    }
  }

  async getAccount(userId: number, requestingUser:User):Promise<AccountDto> {
    if (!requestingUser.isSelfOrAdmin(userId))
      throw new ForbiddenException()

    const user:User|null = await this.userService.getByUserId(userId);
    if (!user) 
      throw new NotFoundException();
    
    switch (user.role) {
      case Role.COMPANY: {
        let profile = await this.companyProfileService.getCompanyProfile(user.id);
        return new CompanyAccountDto(user, profile);
      }
      case Role.STUDENT: {
        let profile = await this.studentProfileService.getStudentProfile(user.id);
        return new StudentAccountDto(user, profile);
      }
      default:
        return new AccountDto(user);
    }
  }

  async deleteAccount(userId: number, requestingUser:User) {
    if (!requestingUser.isSelfOrAdmin(userId))
      throw new ForbiddenException();

    const user = await this.userService.getByUserId(userId);
    if (!user) throw new NotFoundException();

    return await this.tx.run(async () => {
      // Utilisateur applicatif (cascade sur le profil)
      await this.userService.deleteUser(userId);
      // Utilisateur supabase
      await this.authService.deleteUser(user.supabaseUserId)
    });
  }
}