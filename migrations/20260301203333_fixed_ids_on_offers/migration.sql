/*
  Warnings:

  - The primary key for the `offers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `offers` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "offers" DROP CONSTRAINT "offers_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "offers_pkey" PRIMARY KEY ("id");
