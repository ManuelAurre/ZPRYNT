BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Ventas] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] NVARCHAR(1000),
    [costoDiseno] INT,
    [costoMarketingEntrega] INT,
    [costoPostprocesado] INT,
    [costoImpresora] INT,
    [costoTotal] INT,
    [usoConsumible] INT,
    CONSTRAINT [Ventas_pkey] PRIMARY KEY CLUSTERED ([id])
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
