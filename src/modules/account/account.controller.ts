import { Body, Controller, Delete, Get, NotImplementedException, Post, Param } from '@nestjs/common';
import { Public } from "@/common/decorators/roles.decorator";
import { CurrentUser } from "@/common/decorators/user.decorator";
import { User } from "../users/models/user";
import { IAccountUseCase } from '@modules/account/usecases/i.account.usecase';
import { RegisterCompanyDto, RegisterStudentDto } from '@modules/account/dto/register.dto';

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

    @Delete("users/me")
    deleteAccount(@CurrentUser() user:User) {
      throw new NotImplementedException();
    }
}