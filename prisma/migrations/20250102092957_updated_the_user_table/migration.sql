/*
  Warnings:

  - You are about to drop the column `completeness` on the `profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profile" DROP COLUMN "completeness";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "completeness" INTEGER NOT NULL DEFAULT 0;
