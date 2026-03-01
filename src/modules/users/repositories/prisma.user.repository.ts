import { Injectable } from "@nestjs/common";
import { User, UserEntity } from '../models/user';
import { PrismaDbContext } from "@/infrastructure/database/prisma/prisma-db-context";

@Injectable() 
export class PrismaUserRepository {
  constructor(private readonly ctx:PrismaDbContext) {}

    async findByUserId(userId: number): Promise<User | null> {
      const record:UserEntity|null = await this.ctx.db.user.findUnique({
        where: { id:userId },
      })
      if (!record) return null;
      return User.fromEntity(record);
    }
    
    async findBySupabaseId(supabaseUserId: string): Promise<User|null> {
        const user:UserEntity|null = await this.ctx.db.user.findUnique({
            where: {supabaseUserId}
        })

        if (!user) return null;

        return User.fromEntity(user);
    }
    
    async create(userData: User): Promise<User> {
        const user:UserEntity = await this.ctx.db.user.create({
            data: {
                supabaseUserId: userData.supabaseUserId, 
                email: userData.email,
                role: userData.role
            }
        });

        return User.fromEntity(user);
    }

    async deleteUser(userId:number):Promise<void> {
        await this.ctx.db.user.delete({where:{id:userId}})
    }
}