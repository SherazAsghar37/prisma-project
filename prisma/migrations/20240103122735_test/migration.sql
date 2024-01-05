/*
  Warnings:

  - You are about to drop the column `reference_token` on the `Facebook` table. All the data in the column will be lost.
  - You are about to drop the column `reference_token` on the `Google` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Facebook" DROP COLUMN "reference_token",
ADD COLUMN     "refresh_token" TEXT;

-- AlterTable
ALTER TABLE "Google" DROP COLUMN "reference_token",
ADD COLUMN     "refresh_token" TEXT;
