/*
  Warnings:

  - Added the required column `tableNumber` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `purchase` ADD COLUMN `tableNumber` VARCHAR(191) NOT NULL;
