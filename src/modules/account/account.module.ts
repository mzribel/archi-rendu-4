import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../users/user.module";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { IAccountUseCase } from '@modules/account/usecases/i.account.usecase';
import { CompanyModule } from '@modules/companies/company.module';
import { StudentModule } from '@modules/students/student.module';

@Module({
    imports: [AuthModule, UserModule, CompanyModule, StudentModule],
    controllers: [AccountController],
    providers:[
      AccountService,
      { provide:IAccountUseCase, useClass: AccountService }
    ],
    exports:[IAccountUseCase]
})
export class AccountModule {}