/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `User` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[User] ADD [edad] INT,
[password] NVARCHAR(1000) NOT NULL,
[tipo] NVARCHAR(1000) NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[Impresora] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] NVARCHAR(1000) NOT NULL,
    [tipo] NVARCHAR(1000) NOT NULL,
    [imagen] NVARCHAR(1000) NOT NULL,
    [tamanoX] FLOAT(53) NOT NULL,
    [tamanoY] FLOAT(53) NOT NULL,
    [tamanoZ] FLOAT(53) NOT NULL,
    CONSTRAINT [Impresora_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Cotizacion] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] NVARCHAR(1000) NOT NULL,
    [link] NVARCHAR(1000) NOT NULL,
    [presupuesto] FLOAT(53) NOT NULL,
    [tipo] NVARCHAR(1000) NOT NULL,
    [tamano] NVARCHAR(1000) NOT NULL,
    [estatus] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Cotizacion_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Utilizables] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] NVARCHAR(1000) NOT NULL,
    [cantidad] INT NOT NULL,
    [tipo] NVARCHAR(1000) NOT NULL,
    [estado] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Utilizables_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
