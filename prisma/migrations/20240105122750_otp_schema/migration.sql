-- CreateTable
CREATE TABLE "EmailVerifiacitonToken" (
    "email" TEXT NOT NULL,
    "otp" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerifiacitonToken_email_key" ON "EmailVerifiacitonToken"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerifiacitonToken_otp_key" ON "EmailVerifiacitonToken"("otp");
