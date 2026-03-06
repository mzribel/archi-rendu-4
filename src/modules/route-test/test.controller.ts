import { Public, Roles } from '@/common/decorators/roles.decorator';
import { Controller, Get, Req } from '@nestjs/common';
import { User } from '@modules/users/models/user';
import { CurrentUser } from '@common/decorators/user.decorator';
import type {Request} from 'express';

@Controller()
export class TestController {
  @Get() @Public()
  greetings(@Req() req:Request) {
    return {
      canard: "🌊🦆🌊",
      message: "Si vous voyez ce petit canard, c'est que l'API est réveillée et fonctionnelle !",
      documentation:`${req.protocol}://${req.get('Host')}${req.originalUrl}api/docs`
    }
  }

  @Get("test") @Public()
  helloWorld() {
    return "Hello world !"
  }

  @Get("test/auth")
  testAuth() {
    return "Hello from authenticated route !"
  }

  @Get("test/admin")
  @Roles("ADMIN")
  testAdminRole() {
    return "Hello from admin route !"
  }

  @Get("test/student")
  @Roles("STUDENT", "ADMIN")
  testStudentRole() {
    return "Hello from student route !"
  }

  @Get("test/company")
  @Roles("COMPANY")
  testCompanyRole() {
    return "Hello from company route !"
  }

  @Get("test/user")
  getUser(@CurrentUser() user:User) {
    return user;
  }
}