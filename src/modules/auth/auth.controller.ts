import { Body, Controller, Get, NotImplementedException, Post, Query } from '@nestjs/common';
import { Public } from '@/common/decorators/roles.decorator';
import { IAuthUseCase } from '@modules/auth/usecases/i.auth.usecase';

@Public()
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: IAuthUseCase) {}

  @Post("login")
  login(@Body() dto: {email:string;password:string}) {
    return this.authService.loginWithPassword(dto.email, dto.password)
  }

  @Get("reset_password")
  reset_password(@Query() email:string) {
    throw new NotImplementedException();
  }
}
