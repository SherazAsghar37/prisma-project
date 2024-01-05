/*
  Warnings:

  - You are about to drop the column `author_id` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `author_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uid]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uid` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Author" DROP CONSTRAINT "Author_author_id_fkey";

-- DropIndex
DROP INDEX "Author_author_id_key";

-- DropIndex
DROP INDEX "User_author_id_key";

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "author_id",
ADD COLUMN     "uid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "author_id";

-- CreateIndex
CREATE UNIQUE INDEX "Author_uid_key" ON "Author"("uid");

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
