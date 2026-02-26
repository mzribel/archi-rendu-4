import { IsEmail, IsEnum, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { GlobalRegisterDto } from "./global-register.dto";
import { Industry } from '@common/enums/industry.enum';

export class RegisterCompanyDto extends GlobalRegisterDto {

    @IsNotEmpty()
    legalName!:string;

    @IsEnum(Industry)
    industry: Industry;

    @IsOptional()
    @Matches(/^\d{14}$/, { message: "SIRET must contain 14 numbers" })
    siret?:string;
}