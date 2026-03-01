/*
  Warnings:

  - Added the required column `firstName` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `student_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "company_profiles" ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "contactPhoneNumber" TEXT;

-- AlterTable
ALTER TABLE "student_profiles" ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "contactPhoneNumber" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "showLastName" BOOLEAN NOT NULL DEFAULT false;
