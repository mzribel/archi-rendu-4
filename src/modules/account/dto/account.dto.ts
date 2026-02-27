import { StudentProfile } from "@/modules/students/models/student-profile";
import { User } from "@/modules/users/models/user";
import { CompanyProfile } from "@prisma/client";

export class AccountDto {
    user:User;
    constructor(user:User) { this.user = user; }
}

export class StudentAccountDto extends AccountDto {
    profile: StudentProfile;

        constructor(user:User, profile:StudentProfile) {
        super(user);
        this.profile = profile;
    }
}

export class CompanyAccountDto extends AccountDto {
    profile: CompanyProfile;

    constructor(user:User, profile:CompanyProfile) {
        super(user);
        this.profile = profile;
    }
}