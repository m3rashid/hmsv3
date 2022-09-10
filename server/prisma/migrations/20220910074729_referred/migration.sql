/*
  Warnings:

  - The `referedBy` column on the `Appointment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "referedBy",
ADD COLUMN     "referedBy" INTEGER;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_referedBy_fkey" FOREIGN KEY ("referedBy") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
