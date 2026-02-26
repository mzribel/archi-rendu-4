import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "@/common/enums/role.enum";
import { ROLES_KEY } from '@/common/decorators/roles.decorator';
import { IUserUseCase } from '@modules/users/usecases/i.user.usecase';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: IUserUseCase,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Pas de rôle passé
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    if (!req.user || !requiredRoles.includes(req.user.role)) {
      throw new ForbiddenException('Insufficient role');
    }

    return true;
  }
}