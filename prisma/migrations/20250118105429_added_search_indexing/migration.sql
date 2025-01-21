-- AlterTable
ALTER TABLE "employment" ALTER COLUMN "isCurrent" SET DEFAULT true;

-- CreateIndex
CREATE INDEX "profile_location_idx" ON "profile"("location");

-- CreateIndex
CREATE INDEX "user_name_idx" ON "user"("name");
