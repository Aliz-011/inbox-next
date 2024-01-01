/*
  Warnings:

  - You are about to drop the column `chatId` on the `Mail` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Mail` table. All the data in the column will be lost.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[mailCode]` on the table `Mail` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recipientId` to the `Mail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Mail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_senderId_fkey";

-- DropForeignKey
ALTER TABLE "Mail" DROP CONSTRAINT "Mail_chatId_fkey";

-- DropForeignKey
ALTER TABLE "Mail" DROP CONSTRAINT "Mail_userId_fkey";

-- DropIndex
DROP INDEX "Mail_chatId_idx";

-- DropIndex
DROP INDEX "Mail_userId_idx";

-- AlterTable
ALTER TABLE "Mail" DROP COLUMN "chatId",
DROP COLUMN "userId",
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "recipientId" TEXT NOT NULL,
ADD COLUMN     "senderId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "departmentId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Chat";

-- CreateTable
CREATE TABLE "Label" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mailId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Label_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Label_name_key" ON "Label"("name");

-- CreateIndex
CREATE INDEX "Label_mailId_idx" ON "Label"("mailId");

-- CreateIndex
CREATE UNIQUE INDEX "Mail_mailCode_key" ON "Mail"("mailCode");

-- CreateIndex
CREATE INDEX "Mail_senderId_idx" ON "Mail"("senderId");

-- CreateIndex
CREATE INDEX "Mail_recipientId_idx" ON "Mail"("recipientId");

-- CreateIndex
CREATE INDEX "User_departmentId_idx" ON "User"("departmentId");

-- CreateIndex
CREATE INDEX "User_id_departmentId_idx" ON "User"("id", "departmentId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mail" ADD CONSTRAINT "Mail_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mail" ADD CONSTRAINT "Mail_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_mailId_fkey" FOREIGN KEY ("mailId") REFERENCES "Mail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
