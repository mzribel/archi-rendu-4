import { Role, UserDto } from '@modules/users/dto/user.dto';
import { User } from '@modules/users/models/user';

export abstract class IUserUseCase {
  abstract createUser(supabaseUserId:string, email:string, role:Role): Promise<UserDto>;
  abstract getBySupabaseUserId(supabaseUserId:string): Promise<User|null>;
}