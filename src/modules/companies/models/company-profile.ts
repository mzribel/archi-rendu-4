import { Industry } from '@common/enums/industry.enum';
export interface CompanyEntity {
  userId: number;
  legalName: string;
  industry: string | null; // Prisma renvoie l'enum sous forme de string
  description: string | null;
  siret: string | null;
  isVerified: boolean;
}

export class CompanyProfile {
  constructor(
    public readonly userId: number,
    public readonly legalName: string,
    public readonly industry: Industry | null,
    public readonly description: string | null,
    public readonly siret: string | null,
    public readonly isVerified: boolean,
  ) {}

  static fromPersistence(data: CompanyEntity): CompanyProfile {
    return new CompanyProfile(
      data.userId,
      data.legalName,
      data.industry ? (data.industry as Industry) : null,
      data.description,
      data.siret,
      data.isVerified,
    );
  }
}