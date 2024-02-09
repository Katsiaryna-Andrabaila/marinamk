/*
  Warnings:

  - Added the required column `clientEmail` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientName` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAvailable` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `procedure` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "time" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "procedure" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Post" ("createdAt", "date", "id", "time", "updatedAt") SELECT "createdAt", "date", "id", "time", "updatedAt" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_id_key" ON "Post"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
