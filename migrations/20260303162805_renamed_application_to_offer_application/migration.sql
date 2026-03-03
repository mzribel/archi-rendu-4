/*
  Warnings:

  - You are about to drop the `applications` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "OfferApplicationStatus" AS ENUM ('SUBMITTED', 'REJECTED', 'ACCEPTED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_offerId_fkey";

-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_studentId_fkey";

-- DropTable
DROP TABLE "applications";

-- DropEnum
DROP TYPE "ApplicationStatus";

-- CreateTable
CREATE TABLE "offer_applications" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "cvUrl" TEXT NOT NULL,
    "status" "OfferApplicationStatus" NOT NULL DEFAULT 'SUBMITTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "studentId" INTEGER NOT NULL,
    "offerId" INTEGER NOT NULL,

    CONSTRAINT "offer_applications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "offer_applications" ADD CONSTRAINT "offer_applications_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student_profiles"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offer_applications" ADD CONSTRAINT "offer_applications_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
