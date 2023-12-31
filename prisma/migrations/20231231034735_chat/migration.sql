/*
  Warnings:

  - You are about to drop the column `senderId` on the `Mail` table. All the data in the column will be lost.
  - You are about to drop the `Attachment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `chatId` to the `Mail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Mail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_mailId_fkey";

-- DropForeignKey
ALTER TABLE "Mail" DROP CONSTRAINT "Mail_senderId_fkey";

-- DropIndex
DROP INDEX "Mail_senderId_idx";

-- AlterTable
ALTER TABLE "Mail" DROP COLUMN "senderId",
ADD COLUMN     "attachment" TEXT,
ADD COLUMN     "chatId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "mailCode" DROP NOT NULL;

-- DropTable
DROP TABLE "Attachment";

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Chat_recipientId_idx" ON "Chat"("recipientId");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_senderId_recipientId_key" ON "Chat"("senderId", "recipientId");

-- CreateIndex
CREATE INDEX "Mail_userId_idx" ON "Mail"("userId");

-- CreateIndex
CREATE INDEX "Mail_chatId_idx" ON "Mail"("chatId");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mail" ADD CONSTRAINT "Mail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mail" ADD CONSTRAINT "Mail_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
