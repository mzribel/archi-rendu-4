import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "@/modules/users/dto/user.dto";
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
    const supabaseUserId: string | undefined = req.user?.id;

    // Utilisateur non authentifié
    if (!supabaseUserId) {
      throw new ForbiddenException('User is not authenticated');
    }

    const user = await this.userService.getBySupabaseUserId(supabaseUserId);
    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Insufficient role');
    }

    // Optionnel: rendre le user DB dispo ensuite
    req.appUser = user;
    return true;
  }
}