import { UserDto } from "../dto/user.dto";
import { Role } from '@common/enums/role.enum';

export interface UserEntity {
  id: number;
  supabaseUserId: string;
  email: string;
  role: string; // Prisma renvoie souvent des string pour les enums
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}

export class User {
    constructor(
        public readonly id:number,
        public readonly supabaseUserId:string,
        public readonly email:string,
        public readonly role:Role,
        public readonly isActive:boolean,
        public readonly createdAt: Date,
        public readonly updatedAt:Date|null,
    ){}

    toDto(): UserDto {
        return {
            id:this.id,
            email:this.email,
            role:this.role
        }
    }

    static fromAuth(supabaseUserId:string, email:string, role:Role):User {
        return new User(
          0,                // Temporaire
          supabaseUserId,
          email,
          role,
          true,
          new Date(),
          new Date()
        );
    }

    static fromEntity(data:UserEntity): User {
      return new User(
        data.id,
        data.supabaseUserId,
        data.email,
        data.role as Role,
        data.isActive,
        data.createdAt,
        data.updatedAt,
      );
    }
}