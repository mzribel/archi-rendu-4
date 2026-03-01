import { RegisterDto } from "@/modules/account/dto/register.dto";

export abstract class IAuthUseCase {
  abstract registerWithPassword(email: string, password: string);
  abstract loginWithPassword(email: string, password: string);
  abstract requestPasswordReset(email: string);
  abstract resetPassword(otp:string, dto:RegisterDto)
  abstract deleteUser(externalUserId: string);
}