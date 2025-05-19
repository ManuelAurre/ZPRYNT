BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Impresora] ADD [costoPorHora] NVARCHAR(1000),
[dimensiones] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Utilizables] ADD [costoDeVenta] NVARCHAR(1000);

-- CreateTable
CREATE TABLE [dbo].[Puesto] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] NVARCHAR(1000) NOT NULL,
    [cuotaPorHora] NVARCHAR(1000) NOT NULL,
    [estatus] INT NOT NULL,
    [descripcion] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Puesto_pkey] PRIMARY KEY CLUSTERED ([id])
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
