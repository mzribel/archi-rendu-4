import { StudyLevel } from '@common/enums/study-level.enum';
import { FieldOfStudy } from '@common/enums/field-of-study.enum';

export class StudentProfile {
  constructor(
    public readonly userId: number,
    public readonly school: string | null,
    public readonly degreeName: string | null,
    public readonly startYear: number | null,
    public readonly endYear: number | null,
    public readonly currentLevel: StudyLevel | null,
    public readonly targetLevel: StudyLevel | null,
    public readonly pastDegrees: string[],
    public readonly skills: string[],
    public readonly fieldOfStudy: FieldOfStudy | null,
    public readonly cvUrl: string | null,
    public readonly isVisible: boolean,
    public readonly showLastName: boolean,
  ) {}
}