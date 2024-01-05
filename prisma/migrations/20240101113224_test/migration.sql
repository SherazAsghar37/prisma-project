-- CreateTable
CREATE TABLE "Author" (
    "profile_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL DEFAULT 'Noob',
    "bio" TEXT NOT NULL DEFAULT '',
    "followers_count" INTEGER NOT NULL DEFAULT 0,
    "following_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "is_fiction" BOOLEAN NOT NULL,
    "date_published" TIMESTAMP(3) NOT NULL,
    "author_id" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Author"("profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;
