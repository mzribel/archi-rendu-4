import { CompanyProfile, CreateCompanyInput } from '../models/company-profile';
import { Injectable } from "@nestjs/common";
import { PrismaDbContext } from "@/infrastructure/database/prisma/prisma-db-context";

@Injectable()
export class PrismaCompanyProfileRepository {
    constructor(private readonly ctx:PrismaDbContext) {}
    
    async createProfile(data:CreateCompanyInput) {
        const saved:any = await this.ctx.db.companyProfile.create({ data })

        return CompanyProfile.fromPersistence(saved);
    }
    findById(id: number): Promise<CompanyProfile | null> {
        throw new Error("Method not implemented.");
    }

    async existsBySiret(siret: string): Promise<boolean> {
        const user = await this.ctx.db.companyProfile.findFirst({
            where: { siret }
        });

        return user !== null;
    }

    async findByUserId(userId: number): Promise<CompanyProfile | null> {
      const record = await this.ctx.db.companyProfile.findUnique({
        where: { userId },
      })
      if (!record) { return null;}

      return CompanyProfile.fromPersistence(record);
    }
}