-- DropForeignKey
ALTER TABLE "offers" DROP CONSTRAINT "offers_companyId_fkey";

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company_profiles"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
