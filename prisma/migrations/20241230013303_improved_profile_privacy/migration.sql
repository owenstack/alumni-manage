/*
  Warnings:

  - You are about to drop the column `visibility` on the `profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profile" DROP COLUMN "visibility";

-- AlterTable
ALTER TABLE "profile_privacy" ADD COLUMN     "defaultVisibility" "VisibilityLevel" NOT NULL DEFAULT 'ALUMNI_ONLY',
ADD COLUMN     "interestsVisibility" "VisibilityLevel" NOT NULL DEFAULT 'ALUMNI_ONLY',
ADD COLUMN     "searchable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "skillsVisibility" "VisibilityLevel" NOT NULL DEFAULT 'ALUMNI_ONLY';

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "onboarded" BOOLEAN NOT NULL DEFAULT false;
