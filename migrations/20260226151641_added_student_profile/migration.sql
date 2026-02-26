/*
  Warnings:

  - The values [ETUDIANT,ENTREPRISE,VERIFICATEUR] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "Industry" AS ENUM ('AEROSPACE', 'AGRICULTURE', 'AUTOMOTIVE', 'BANKING_INSURANCE', 'CONSTRUCTION', 'EDUCATION', 'ENERGY', 'HEALTHCARE', 'HOSPITALITY', 'IT_SERVICES', 'LUXURY', 'MANUFACTURING', 'MEDIA_ENTERTAINMENT', 'RETAIL', 'PUBLIC_SECTOR', 'TRANSPORT_LOGISTICS');

-- CreateEnum
CREATE TYPE "FieldOfStudy" AS ENUM ('ADMINISTRATION', 'ARTS_DESIGN', 'BUSINESS_MANAGEMENT', 'COMMUNICATION', 'COMPUTER_SCIENCE', 'DATA_ANALYTICS', 'ENGINEERING', 'FINANCE_ACCOUNTING', 'HUMAN_RESOURCES', 'LAW', 'MARKETING', 'SALES');

-- CreateEnum
CREATE TYPE "StudyLevel" AS ENUM ('BAC_PLUS_2', 'BAC_PLUS_3', 'BAC_PLUS_4', 'BAC_PLUS_5', 'BAC_PLUS_6', 'DOCTORATE');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'STUDENT', 'COMPANY');
ALTER TABLE "public"."users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'STUDENT';
COMMIT;

-- AlterTable
ALTER TABLE "companyProfiles" ADD COLUMN     "description" TEXT,
ADD COLUMN     "industry" "Industry";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "role" SET DEFAULT 'STUDENT';

-- CreateTable
CREATE TABLE "student_profiles" (
    "userId" INTEGER NOT NULL,
    "school" TEXT,
    "degreeName" TEXT,
    "startYear" INTEGER,
    "endYear" INTEGER,
    "currentLevel" "StudyLevel",
    "targetLevel" "StudyLevel",
    "pastDegrees" TEXT[],
    "skills" TEXT[],
    "fieldOfStudy" "FieldOfStudy",
    "cvUrl" TEXT,
    "isVisible" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "student_profiles_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "student_profiles_userId_key" ON "student_profiles"("userId");

-- AddForeignKey
ALTER TABLE "student_profiles" ADD CONSTRAINT "student_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
