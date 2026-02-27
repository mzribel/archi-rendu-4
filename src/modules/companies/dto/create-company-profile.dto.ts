import { IsDefined, IsEnum, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { Industry } from '@common/enums/industry.enum';

export class CreateCompanyProfileDto {
  @IsNotEmpty()
  legalName!:string;

  @IsEnum(Industry)
  industry!: string;

  @IsOptional()
  @Matches(/^\d{14}$/, { message: "SIRET must contain 14 numbers" })
  siret?:string;
}