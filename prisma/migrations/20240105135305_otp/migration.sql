/*
  Warnings:

  - Added the required column `password` to the `EmailVerifiacitonToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailVerifiacitonToken" ADD COLUMN     "password" TEXT NOT NULL;
