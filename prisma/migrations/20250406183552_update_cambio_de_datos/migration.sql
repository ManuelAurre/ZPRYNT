/*
  Warnings:

  - You are about to drop the column `tamanoX` on the `Impresora` table. All the data in the column will be lost.
  - You are about to drop the column `tamanoY` on the `Impresora` table. All the data in the column will be lost.
  - You are about to drop the column `tamanoZ` on the `Impresora` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `Utilizables` table. All the data in the column will be lost.
  - Added the required column `comentarios` to the `Cotizacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diseno` to the `Cotizacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idConfiguracionCalculadora` to the `Cotizacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marketingEntrega` to the `Cotizacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postprocesado` to the `Cotizacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `velocidad` to the `Impresora` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cantidadActual` to the `Utilizables` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costoDeCompra` to the `Utilizables` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Cotizacion] ADD [comentarios] NVARCHAR(1000) NOT NULL,
[diseno] NVARCHAR(1000) NOT NULL,
[idConfiguracionCalculadora] INT NOT NULL,
[marketingEntrega] NVARCHAR(1000) NOT NULL,
[postprocesado] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Impresora] DROP COLUMN [tamanoX],
[tamanoY],
[tamanoZ];
ALTER TABLE [dbo].[Impresora] ADD [velocidad] FLOAT(53) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Utilizables] ALTER COLUMN [cantidad] FLOAT(53) NOT NULL;
ALTER TABLE [dbo].[Utilizables] DROP COLUMN [estado];
ALTER TABLE [dbo].[Utilizables] ADD [cantidadActual] FLOAT(53) NOT NULL,
[costoDeCompra] NVARCHAR(1000) NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[ConfiguracionCalculadora] (
    [id] INT NOT NULL IDENTITY(1,1),
    [utilizablesId] INT NOT NULL,
    [impresoraId] INT NOT NULL,
    [costoPorTiempo] FLOAT(53) NOT NULL,
    [costoDiseno] FLOAT(53) NOT NULL,
    [costoPostprocesado] FLOAT(53) NOT NULL,
    [costoMarketingEntrega] FLOAT(53) NOT NULL,
    [empleadoId] INT NOT NULL,
    CONSTRAINT [ConfiguracionCalculadora_pkey] PRIMARY KEY CLUSTERED ([id])
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
