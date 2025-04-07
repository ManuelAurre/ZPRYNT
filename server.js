const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  const { name, email, password, tipo, edad } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        tipo,
        edad: parseInt(edad, 10)
      }
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (user && user.password === password) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send('Error logging in');
  }
});

// Ruta para registrar una nueva configuración de calculadora
app.post('/api/calculadoras', async (req, res) => {
  console.log('Solicitud recibida en /api/calculadoras:', req.body);

  const { utilizablesId, impresoraId, costoPorTiempo, costoDiseno, costoPostprocesado, costoMarketingEntrega } = req.body;

  if (!utilizablesId || !impresoraId || !costoPorTiempo || !costoDiseno || !costoPostprocesado || !costoMarketingEntrega) {
    console.error('Faltan campos obligatorios');
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    const data = {
      utilizablesId: parseInt(utilizablesId, 10),
      impresoraId: parseInt(impresoraId, 10),
      costoPorTiempo: parseFloat(costoPorTiempo),
      costoDiseno: parseFloat(costoDiseno),
      costoPostprocesado: parseFloat(costoPostprocesado),
      costoMarketingEntrega: parseFloat(costoMarketingEntrega),
      empleadoId: 1,
    };

    console.log('Datos procesados para Prisma:', data);

    const configuracionCalculadora = await prisma.configuracionCalculadora.create({
      data,
    });

    console.log('Configuración de calculadora registrada:', configuracionCalculadora);
    res.status(201).json({ message: 'Configuración de calculadora registrada exitosamente.', configuracionCalculadora });
  } catch (error) {
    console.error('Error al registrar la configuración de calculadora:', error);
    res.status(500).json({ error: 'Error al registrar la configuración de calculadora. Verifica el modelo en schema.prisma y las migraciones.' });
  }
});

// Ruta para obtener todas las configuraciones de la calculadora
app.get('/api/calculadoras', async (req, res) => {
  try {
    console.log('Consulta recibida en /api/calculadoras'); // Confirmar que la ruta está siendo llamada
    const calculadoras = await prisma.configuracionCalculadora.findMany({
      select: {
        id: true,
        utilizablesId: true,
        impresoraId: true,
        costoPorTiempo: true,
        costoDiseno: true,
        costoPostprocesado: true,
        costoMarketingEntrega: true,
      },
    });
    console.log('Datos obtenidos de la base de datos:', calculadoras); // Verificar los datos obtenidos
    res.json(calculadoras);
  } catch (error) {
    console.error('Error al obtener las configuraciones de la calculadora:', error);
    res.status(500).json({ error: 'Error al obtener las configuraciones de la calculadora' });
  }
});

// Ruta para obtener los detalles de una configuración específica
app.get('/api/calculadoras/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const configuracion = await prisma.configuracionCalculadora.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!configuracion) {
      return res.status(404).json({ error: 'Configuración no encontrada' });
    }
    res.json(configuracion);
  } catch (error) {
    console.error('Error al obtener los detalles de la configuración:', error);
    res.status(500).json({ error: 'Error al obtener los detalles de la configuración' });
  }
});

// Ruta para actualizar una configuración existente
app.put('/api/calculadoras/:id', async (req, res) => {
  const { id } = req.params;
  const { utilizablesId, impresoraId, costoPorTiempo, costoDiseno, costoPostprocesado, costoMarketingEntrega } = req.body;

  try {
    const configuracion = await prisma.configuracionCalculadora.update({
      where: { id: parseInt(id, 10) },
      data: {
        utilizablesId: parseInt(utilizablesId, 10),
        impresoraId: parseInt(impresoraId, 10),
        costoPorTiempo: parseFloat(costoPorTiempo),
        costoDiseno: parseFloat(costoDiseno),
        costoPostprocesado: parseFloat(costoPostprocesado),
        costoMarketingEntrega: parseFloat(costoMarketingEntrega),
      },
    });
    res.json({ message: 'Configuración de calculadora actualizada exitosamente.', configuracion });
  } catch (error) {
    console.error('Error al actualizar la configuración de calculadora:', error);
    res.status(500).json({ error: 'Error al actualizar la configuración de calculadora.' });
  }
});

// Ruta para eliminar una configuración de calculadora
app.delete('/api/calculadoras/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const configuracion = await prisma.configuracionCalculadora.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json({ message: 'Configuración de calculadora eliminada exitosamente.', configuracion });
  } catch (error) {
    console.error('Error al eliminar la configuración de calculadora:', error);
    res.status(500).json({ error: 'Error al eliminar la configuración de calculadora.' });
  }
});

// Ruta para registrar una nueva impresora
app.post('/api/impresoras', async (req, res) => {
  console.log('Solicitud recibida en /api/impresoras:', req.body);

  const { nombre, tipo, imagen, velocidad } = req.body;

  if (!nombre || !tipo || !imagen || !velocidad) {
    console.error('Faltan campos obligatorios');
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    const impresora = await prisma.impresora.create({
      data: {
        nombre,
        tipo,
        imagen,
        velocidad: parseFloat(velocidad),
      },
    });

    console.log('Impresora registrada:', impresora);
    res.status(201).json({ message: 'Impresora registrada exitosamente.', impresora });
  } catch (error) {
    console.error('Error al registrar la impresora:', error);
    res.status(500).json({ error: 'Error al registrar la impresora. Verifica el modelo en schema.prisma y las migraciones.' });
  }
});

// Ruta para obtener los detalles de una impresora específica
app.get('/api/impresoras/:id', async (req, res) => {
  const { id } = req.params;
  try {
    console.log(`Consulta recibida para impresora con ID: ${id}`); // Depuración
    const impresora = await prisma.impresora.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!impresora) {
      return res.status(404).json({ error: 'Impresora no encontrada' });
    }
    console.log('Datos de la impresora obtenidos:', impresora); // Depuración
    res.json(impresora);
  } catch (error) {
    console.error('Error al obtener los detalles de la impresora:', error);
    res.status(500).json({ error: 'Error al obtener los detalles de la impresora' });
  }
});

// Ruta para obtener todas las impresoras
app.get('/api/impresoras', async (req, res) => {
  try {
    console.log('Consulta recibida en /api/impresoras'); // Confirmar que la ruta está siendo llamada
    const impresoras = await prisma.impresora.findMany({
      select: {
        id: true,
        nombre: true,
      },
    });
    console.log('Datos obtenidos de la base de datos:', impresoras); // Verificar los datos obtenidos
    res.json(impresoras);
  } catch (error) {
    console.error('Error al obtener las impresoras:', error);
    res.status(500).json({ error: 'Error al obtener las impresoras' });
  }
});

// Ruta para actualizar una impresora
app.put('/api/impresoras/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, imagen, velocidad } = req.body;

  try {
    const impresora = await prisma.impresora.update({
      where: { id: parseInt(id, 10) },
      data: {
        nombre,
        tipo,
        imagen,
        velocidad: parseFloat(velocidad),
      },
    });
    res.json({ message: 'Impresora actualizada exitosamente.', impresora });
  } catch (error) {
    console.error('Error al actualizar la impresora:', error);
    res.status(500).json({ error: 'Error al actualizar la impresora.' });
  }
});

// Ruta para eliminar una impresora
app.delete('/api/impresoras/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const impresora = await prisma.impresora.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json({ message: 'Impresora eliminada exitosamente.', impresora });
  } catch (error) {
    console.error('Error al eliminar la impresora:', error);
    res.status(500).json({ error: 'Error al eliminar la impresora.' });
  }
});

// Ruta para registrar un nuevo consumible
app.post('/api/utilizables', async (req, res) => {
  console.log('Solicitud recibida en /api/utilizables:', req.body);

  const { nombre, cantidad, cantidadActual, tipo, material, costoDeCompra } = req.body;

  if (!nombre || !cantidad || !tipo || !material || !costoDeCompra) {
    console.error('Faltan campos obligatorios');
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    const consumible = await prisma.utilizables.create({
      data: {
        nombre,
        cantidad: parseFloat(cantidad),
        cantidadActual: parseFloat(cantidadActual), // Se espera que cantidadActual sea igual a cantidad
        tipo,
        material,
        costoDeCompra,
      },
    });

    console.log('Consumible registrado:', consumible);
    res.status(201).json({ message: 'Consumible registrado exitosamente.', consumible });
  } catch (error) {
    console.error('Error al registrar el consumible:', error);
    res.status(500).json({ error: 'Error al registrar el consumible. Verifica el modelo en schema.prisma y las migraciones.' });
  }
});

// Ruta para obtener los detalles de un consumible específico
app.get('/api/utilizables/:id', async (req, res) => {
  let { id } = req.params;
  try {
    console.log(`Valor original de ID recibido:`, id); // Depuración
    id = parseInt(id, 10); // Convertir el ID a entero
    if (isNaN(id)) {
      return res.status(400).json({ error: 'El ID proporcionado no es válido' });
    }
    console.log(`Consulta recibida para consumible con ID: ${id}`); // Depuración
    const consumible = await prisma.utilizables.findUnique({
      where: { id },
    });
    if (!consumible) {
      return res.status(404).json({ error: 'Consumible no encontrado' });
    }
    console.log('Datos del consumible obtenidos:', consumible); // Depuración
    res.json(consumible);
  } catch (error) {
    console.error('Error al obtener los detalles del consumible:', error);
    res.status(500).json({ error: 'Error al obtener los detalles del consumible' });
  }
});

// Ruta para obtener todos los consumibles
app.get('/api/utilizables', async (req, res) => {
  try {
    console.log('Consulta recibida en /api/utilizables'); // Confirmar que la ruta está siendo llamada
    const consumibles = await prisma.utilizables.findMany({
      select: {
        id: true,
        nombre: true,
      },
    });
    console.log('Datos obtenidos de la base de datos:', consumibles); // Verificar los datos obtenidos
    res.json(consumibles);
  } catch (error) {
    console.error('Error al obtener los consumibles:', error);
    res.status(500).json({ error: 'Error al obtener los consumibles' });
  }
});

// Ruta para actualizar un consumible
app.put('/api/utilizables/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, cantidad, costoDeCompra, tipo, material } = req.body;

  try {
    const consumible = await prisma.utilizables.update({
      where: { id: parseInt(id, 10) },
      data: {
        nombre,
        cantidad: parseFloat(cantidad),
        costoDeCompra: costoDeCompra.toString(), // Conversión a String
        tipo,
        material,
      },
    });
    res.json({ message: 'Consumible actualizado exitosamente.', consumible });
  } catch (error) {
    console.error('Error al actualizar el consumible:', error);
    res.status(500).json({ error: 'Error al actualizar el consumible.' });
  }
});

// Ruta para eliminar un consumible
app.delete('/api/utilizables/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const consumible = await prisma.utilizables.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json({ message: 'Consumible eliminado exitosamente.', consumible });
  } catch (error) {
    console.error('Error al eliminar el consumible:', error);
    res.status(500).json({ error: 'Error al eliminar el consumible.' });
  }
});

// Ruta para registrar una nueva cotización
app.post('/api/cotizaciones', async (req, res) => {
  console.log('Solicitud recibida en /api/cotizaciones:', req.body);

  const { nombre, link, presupuesto, tamano, DescripcionCliente, tipo } = req.body;

  if (!nombre || !link || !presupuesto || !tamano || !DescripcionCliente || !tipo) {
    console.error('Faltan campos obligatorios');
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes.' });
  }

  try {
    const cotizacion = await prisma.cotizacion.create({
      data: {
        nombre,
        link,
        presupuesto: parseFloat(presupuesto),
        tamano,
        DescripcionCliente,
        tipo,
        estatus: 'Pendiente', // Valor predeterminado
        idConfiguracionCalculadora: null, // Valor por defecto
        diseno: null, // Valor por defecto
        postprocesado: null, // Valor por defecto
        marketingEntrega: null, // Valor por defecto
        comentarios: null, // Valor por defecto
      },
    });

    console.log('Cotización registrada:', cotizacion);
    res.status(201).json({ message: 'Cotización registrada exitosamente.', cotizacion });
  } catch (error) {
    console.error('Error al registrar la cotización:', error);
    res.status(500).json({ error: 'Error al registrar la cotización. Verifica el modelo en schema.prisma y las migraciones.' });
  }
});

// Ruta para obtener los detalles de una cotización específica
app.get('/api/cotizaciones/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cotizacion = await prisma.cotizacion.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!cotizacion) {
      return res.status(404).json({ error: 'Cotización no encontrada' });
    }
    res.json(cotizacion);
  } catch (error) {
    console.error('Error al obtener los detalles de la cotización:', error);
    res.status(500).json({ error: 'Error al obtener los detalles de la cotización' });
  }
});

// Ruta para actualizar una cotización existente
app.put('/api/cotizaciones/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, link, presupuesto, tamano, DescripcionCliente, tipo, diseno, postprocesado, marketingEntrega, comentarios, idConfiguracionCalculadora } = req.body;

  try {
    const cotizacion = await prisma.cotizacion.update({
      where: { id: parseInt(id, 10) },
      data: {
        nombre,
        link,
        presupuesto: parseFloat(presupuesto),
        tamano,
        DescripcionCliente,
        tipo,
        diseno,
        postprocesado,
        marketingEntrega,
        comentarios,
        idConfiguracionCalculadora: idConfiguracionCalculadora ? parseInt(idConfiguracionCalculadora, 10) : null, // Conversión a Int o Null
      },
    });
    res.json({ message: 'Cotización actualizada exitosamente.', cotizacion });
  } catch (error) {
    console.error('Error al actualizar la cotización:', error);
    res.status(500).json({ error: 'Error al actualizar la cotización.' });
  }
});

// Ruta para eliminar una cotización
app.delete('/api/cotizaciones/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cotizacion = await prisma.cotizacion.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json({ message: 'Cotización eliminada exitosamente.', cotizacion });
  } catch (error) {
    console.error('Error al eliminar la cotización:', error);
    res.status(500).json({ error: 'Error al eliminar la cotización.' });
  }
});

// Ruta para obtener todas las cotizaciones
app.get('/api/quotes', async (req, res) => {
  try {
    console.log('Consulta recibida en /api/quotes'); // Confirmar que la ruta está siendo llamada
    const quotes = await prisma.cotizacion.findMany({
      select: {
        id: true,
        nombre: true,
      },
    });
    console.log('Datos obtenidos de la base de datos:', quotes); // Verificar los datos obtenidos
    res.json(quotes);
  } catch (error) {
    console.error('Error al obtener las cotizaciones:', error);
    res.status(500).json({ error: 'Error al obtener las cotizaciones' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
