/*
  Warnings:

  - The `imagen` column on the `Impresora` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `imagen` column on the `Utilizables` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Impresora] DROP COLUMN [imagen];
ALTER TABLE [dbo].[Impresora] ADD [imagen] VARBINARY(max);

-- AlterTable
ALTER TABLE [dbo].[Utilizables] DROP COLUMN [imagen];
ALTER TABLE [dbo].[Utilizables] ADD [imagen] VARBINARY(max);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
