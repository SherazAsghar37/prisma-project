/*
  Warnings:

  - A unique constraint covering the columns `[author_id]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `author_id` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "author_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "password" TEXT,
    "email" TEXT NOT NULL,
    "facebook_id" TEXT,
    "google_id" TEXT,
    "author_id" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Facebook" (
    "facebook_id" TEXT NOT NULL,
    "access_token" TEXT,
    "reference_token" TEXT,

    CONSTRAINT "Facebook_pkey" PRIMARY KEY ("facebook_id")
);

-- CreateTable
CREATE TABLE "Google" (
    "google_id" TEXT NOT NULL,
    "access_token" TEXT,
    "reference_token" TEXT,

    CONSTRAINT "Google_pkey" PRIMARY KEY ("google_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_facebook_id_key" ON "User"("facebook_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_google_id_key" ON "User"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_author_id_key" ON "User"("author_id");

-- CreateIndex
CREATE UNIQUE INDEX "Facebook_facebook_id_key" ON "Facebook"("facebook_id");

-- CreateIndex
CREATE UNIQUE INDEX "Google_google_id_key" ON "Google"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "Author_author_id_key" ON "Author"("author_id");

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("author_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_facebook_id_fkey" FOREIGN KEY ("facebook_id") REFERENCES "Facebook"("facebook_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_google_id_fkey" FOREIGN KEY ("google_id") REFERENCES "Google"("google_id") ON DELETE SET NULL ON UPDATE CASCADE;
