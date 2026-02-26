import { UserDto } from '@modules/users/dto/user.dto';
import { User } from '@modules/users/models/user';
import {Role} from '@common/enums/role.enum'

export abstract class IUserUseCase {
  abstract createUser(supabaseUserId:string, email:string, role:Role): Promise<UserDto>;
  abstract getBySupabaseUserId(supabaseUserId:string): Promise<User|null>;
  abstract getByUserId(userId:number):Promise<User|null>;
}