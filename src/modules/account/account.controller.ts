import { Body, Controller, Delete, Get, NotImplementedException, Post, Param } from '@nestjs/common';
import { AccountService } from "./account.service";
import { RegisterCompanyDto } from "./dto/register-company.dto";
import { Public } from "@/common/decorators/roles.decorator";
import { RegisterStudentDto } from "./dto/register-student.dto";
import { CurrentUser } from "@/common/decorators/user.decorator";
import { User } from "../users/models/user";
import { IAccountUseCase } from '@modules/account/usecases/i.account.usecase';

@Controller()
export class AccountController {
    constructor(
        private readonly accountService: IAccountUseCase,
    ){}
    
    @Public()
    @Post("auth/register/company")
    registerCompany(@Body() dto: RegisterCompanyDto) {
        return this.accountService.registerCompany(dto);
    }

    @Public()
    @Post("auth/register/student")
    registerStudent(@Body() dto: RegisterStudentDto) {
        return this.accountService.registerStudent(dto);
    }

    @Public()
    @Get("users/:userId")
    getAccount(@Param("userId") userId:string) {
      throw new NotImplementedException();
    }

    @Delete("users/me")
    deleteAccount(@CurrentUser() user:User) {
      throw new NotImplementedException();
    }
}