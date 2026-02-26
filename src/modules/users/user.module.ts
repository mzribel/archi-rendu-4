import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { PrismaUserRepository } from "./repositories/prisma.user.repository";
import { IUserUseCase } from '@modules/users/usecases/i.user.usecase';

@Module({
    providers: [
      UserService,
      PrismaUserRepository,
      { provide: IUserUseCase, useClass: UserService},
    ],
    exports: [IUserUseCase]
})
export class UserModule {}