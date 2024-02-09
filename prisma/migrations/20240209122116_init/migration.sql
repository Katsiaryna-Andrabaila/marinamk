/*
  Warnings:

  - Made the column `isAvailable` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "time" TEXT NOT NULL,
    "clientName" TEXT,
    "clientEmail" TEXT,
    "procedure" TEXT,
    "isAvailable" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Post" ("clientEmail", "clientName", "createdAt", "date", "id", "isAvailable", "procedure", "time", "updatedAt") SELECT "clientEmail", "clientName", "createdAt", "date", "id", "isAvailable", "procedure", "time", "updatedAt" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_id_key" ON "Post"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
