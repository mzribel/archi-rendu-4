import { UserResponseDto } from '@/modules/users/dto/user.response.dto';
import { User } from '@modules/users/models/user';
import {Role} from '@common/enums/role.enum'

export abstract class IUserUseCase {
  abstract createUser(supabaseUserId:string, email:string, role:Role): Promise<UserResponseDto>;
  abstract getByUserId(userId:number):Promise<User|null>;
  abstract getBySupabaseUserId(supabaseUserId:string): Promise<User|null>;
  abstract deleteUser(userId:number):Promise<void>;
}