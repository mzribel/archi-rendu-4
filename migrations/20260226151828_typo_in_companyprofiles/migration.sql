/*
  Warnings:

  - You are about to drop the `companyProfiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "companyProfiles" DROP CONSTRAINT "companyProfiles_userId_fkey";

-- DropTable
DROP TABLE "companyProfiles";

-- CreateTable
CREATE TABLE "company_profiles" (
    "userId" INTEGER NOT NULL,
    "legalName" TEXT NOT NULL,
    "industry" "Industry",
    "description" TEXT,
    "siret" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "company_profiles_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_profiles_userId_key" ON "company_profiles"("userId");

-- AddForeignKey
ALTER TABLE "company_profiles" ADD CONSTRAINT "company_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
