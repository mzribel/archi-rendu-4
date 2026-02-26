import { Injectable } from "@nestjs/common";
import { User, UserEntity } from '../models/user';
import { PrismaDbContext } from "@/infrastructure/database/prisma/prisma-db-context";

@Injectable() 
export class PrismaUserRepository {
  constructor(private readonly ctx:PrismaDbContext) {}

    findById(id: number): Promise<User | null> {
        throw new Error("Method not implemented.");
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
}