/*
  Warnings:

  - You are about to drop the column `usoConsumible` on the `Ventas` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Cotizacion] ADD [usoConsumible] INT;

-- AlterTable
ALTER TABLE [dbo].[Ventas] DROP COLUMN [usoConsumible];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
