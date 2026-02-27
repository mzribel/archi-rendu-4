import { IsEnum, IsOptional, IsString, Length, Matches } from 'class-validator';
import { Industry } from '@common/enums/industry.enum';

export class CreateCompanyProfileDto {
  @IsString()
  @Length(1, 255)
  legalName: string;

  @IsOptional()
  @IsEnum(Industry)
  industry?: Industry | null;

  @IsOptional()
  @IsString()
  @Length(0, 2000)
  description?: string | null;

  @IsOptional()
  @Matches(/^\d{14}$/)
  siret?: string | null;
}

export class UpdateCompanyProfileDto {
  @IsOptional()
  @IsString()
  @Length(1, 255)
  legalName?: string;

  @IsOptional()
  @IsEnum(Industry)
  industry?: Industry | null;

  @IsOptional()
  @IsString()
  @Length(0, 2000)
  description?: string | null;

  @IsOptional()
  @Matches(/^\d{14}$/)
  siret?: string | null;
}