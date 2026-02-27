import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateStudentProfileDto{
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @Matches(/^\p{L}+(?:[ '\-]\p{L}+)*$/u)
  firstName!:string

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @Matches(/^\p{L}+(?:[ '\-]\p{L}+)*$/u)
  lastName!:string
}