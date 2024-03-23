/*
  Warnings:

  - You are about to drop the column `time` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[date]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "time";

-- CreateIndex
CREATE UNIQUE INDEX "Post_date_key" ON "Post"("date");
