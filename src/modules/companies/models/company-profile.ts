import { Industry } from '@common/enums/industry.enum';

export class CompanyProfile {
  constructor(
    public readonly userId: number,
    public readonly legalName: string,
    public readonly industry: Industry | null,
    public readonly description: string | null,
    public readonly siret: string | null,
    public readonly isVerified: boolean,
  ) {
  }

  static fromPersistence(record: any): CompanyProfile {
    return new CompanyProfile(
      record.userId,
      record.legalName,
      record.industry as Industry | null,
      record.description,
      record.siret,
      record.isVerified
    );
  }
}
// Les Types (DTOs du domaine)
export type CreateCompanyInput = Omit<CompanyProfile, 'isVerified' | 'fromPersistence'>;
export type UpdateCompanyInput = Partial<Omit<CompanyProfile, 'userId' | 'fromPersistence'>> & { userId: number };