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
    const impresora = await prisma.impresora.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!impresora) {
      return res.status(404).json({ error: 'Impresora no encontrada' });
    }
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
