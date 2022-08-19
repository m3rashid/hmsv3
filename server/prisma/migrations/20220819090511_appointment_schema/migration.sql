-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "pending" BOOL NOT NULL DEFAULT true;
ALTER TABLE "Appointment" ADD COLUMN     "remarks" STRING;
