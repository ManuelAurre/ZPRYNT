const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

// Servir la carpeta de imágenes como estática
app.use('/img', express.static(path.join(__dirname, 'src', 'Img')));

// Configuración de multer para guardar imágenes en memoria
const upload = multer(); // No uses diskStorage, solo memoria

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
      // Devuelve el usuario completo, incluyendo el id de puesto/tipo
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        tipo: user.tipo,
        edad: user.edad
      });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send('Error logging in');
  }
});

// Endpoint para obtener el usuario actual (para Home.jsx)
app.get('/api/users/me', async (req, res) => {
  // Aquí deberías obtener el usuario a partir del token, pero para pruebas:
  // Por ejemplo, si usas sesiones o JWT, aquí deberías decodificar el token.
  // Por ahora, simula con el primer usuario:
  try {
    const user = await prisma.user.findFirst();
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      tipo: user.tipo,
      edad: user.edad
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario actual' });
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
  const { utilizablesId, impresoraId, costoPorTiempo, costoDiseno, costoPostprocesado, costoMarketingEntrega } = req.body;
  try {
    const configuracion = await prisma.configuracionCalculadora.update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        utilizablesId: Number(utilizablesId),
        impresoraId: Number(impresoraId),
        costoPorTiempo: Number(costoPorTiempo),
        costoDiseno: Number(costoDiseno), // Aquí se guarda el ID del responsable de diseño
        costoPostprocesado: Number(costoPostprocesado), // Aquí el de post procesado
        costoMarketingEntrega: Number(costoMarketingEntrega), // Aquí el de marketing
      }
    });
    res.json(configuracion);
  } catch (error) {
    console.error('Error al actualizar la configuración de calculadora:', error);
    res.status(500).json({ error: 'Error al actualizar la configuración de calculadora' });
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

// Ruta para registrar una nueva impresora (imagen como BLOB)
app.post('/api/impresoras', upload.single('imagen'), async (req, res) => {
  const { nombre, tipo, velocidad, costoPorHora, dimensiones } = req.body;
  const imagen = req.file ? req.file.buffer : null;

  if (!nombre || !tipo || !imagen || !velocidad || !costoPorHora || !dimensiones) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    const impresora = await prisma.impresora.create({
      data: {
        nombre,
        tipo,
        imagen, // Buffer
        velocidad: parseFloat(velocidad),
        costoPorHora: costoPorHora.toString(),
        dimensiones,
      },
    });
    res.status(201).json({ message: 'Impresora registrada exitosamente.', impresora: { ...impresora, imagen: undefined } });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar la impresora.' });
  }
});

// Ruta para obtener los detalles de una impresora específica (imagen base64)
app.get('/api/impresoras/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const impresora = await prisma.impresora.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!impresora) {
      return res.status(404).json({ error: 'Impresora no encontrada' });
    }
    // Convierte el buffer a base64 para el frontend
    const impresoraConImagen = {
      ...impresora,
      imagen: impresora.imagen ? impresora.imagen.toString('base64') : null
    };
    res.json(impresoraConImagen);
  } catch (error) {
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
        tipo: true,
        costoPorHora: true,
        dimensiones: true,
      },
    });
    console.log('Datos obtenidos de la base de datos:', impresoras); // Verificar los datos obtenidos
    res.json(impresoras);
  } catch (error) {
    console.error('Error al obtener las impresoras:', error);
    res.status(500).json({ error: 'Error al obtener las impresoras' });
  }
});

// Ruta para actualizar una impresora (imagen como BLOB)
app.put('/api/impresoras/:id', upload.single('imagen'), async (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, velocidad, costoPorHora, dimensiones } = req.body;
  const imagen = req.file ? req.file.buffer : undefined;

  try {
    const data = {
      nombre,
      tipo,
      velocidad: parseFloat(velocidad),
      costoPorHora: costoPorHora !== undefined && costoPorHora !== null ? costoPorHora.toString() : undefined,
      dimensiones,
    };
    if (imagen) data.imagen = imagen;

    const impresora = await prisma.impresora.update({
      where: { id: parseInt(id, 10) },
      data,
    });
    res.json({ message: 'Impresora actualizada exitosamente.', impresora: { ...impresora, imagen: undefined } });
  } catch (error) {
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

// Ruta para registrar un nuevo consumible (con imagen BLOB)
app.post('/api/utilizables', upload.single('imagen'), async (req, res) => {
  console.log('Solicitud recibida en /api/utilizables:', req.body);

  const { nombre, cantidad, cantidadActual, tipo, material, costoDeCompra, costoDeVenta } = req.body;
  const imagen = req.file ? req.file.buffer : null;

  if (!nombre || !cantidad || !tipo || !material || !costoDeCompra || !costoDeVenta) {
    console.error('Faltan campos obligatorios');
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    const consumible = await prisma.utilizables.create({
      data: {
        nombre,
        cantidad: parseFloat(cantidad),
        cantidadActual: parseFloat(cantidadActual),
        tipo,
        material,
        costoDeCompra,
        costoDeVenta,
        imagen, // Buffer
      },
    });

    console.log('Consumible registrado:', consumible);
    res.status(201).json({ message: 'Consumible registrado exitosamente.', consumible: { ...consumible, imagen: undefined } });
  } catch (error) {
    console.error('Error al registrar el consumible:', error);
    res.status(500).json({ error: 'Error al registrar el consumible. Verifica el modelo en schema.prisma y las migraciones.' });
  }
});

// Ruta para obtener los detalles de un consumible específico (imagen base64)
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
    const consumibleConImagen = {
      ...consumible,
      imagen: consumible.imagen ? consumible.imagen.toString('base64') : null
    };
    console.log('Datos del consumible obtenidos:', consumibleConImagen); // Depuración
    res.json(consumibleConImagen);
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
        cantidad: true,
        cantidadActual: true,
        costoDeCompra: true,
        costoDeVenta: true,
        material: true,
      },
    });
    console.log('Datos obtenidos de la base de datos:', consumibles); // Verificar los datos obtenidos
    res.json(consumibles);
  } catch (error) {
    console.error('Error al obtener los consumibles:', error);
    res.status(500).json({ error: 'Error al obtener los consumibles' });
  }
});

// Ruta para actualizar un consumible (con imagen BLOB)
app.put('/api/utilizables/:id', upload.single('imagen'), async (req, res) => {
  const { id } = req.params;
  const { nombre, cantidad, cantidadActual, costoDeCompra, costoDeVenta, tipo, material } = req.body;
  const imagen = req.file ? req.file.buffer : undefined;

  try {
    const data = {
      nombre,
      cantidad: parseFloat(cantidad),
      cantidadActual: cantidadActual !== undefined && cantidadActual !== null ? parseFloat(cantidadActual) : undefined,
      costoDeCompra: costoDeCompra.toString(),
      costoDeVenta: costoDeVenta.toString(),
      tipo,
      material,
    };
    if (imagen) data.imagen = imagen;

    const consumible = await prisma.utilizables.update({
      where: { id: parseInt(id, 10) },
      data,
    });
    res.json({ message: 'Consumible actualizado exitosamente.', consumible: { ...consumible, imagen: undefined } });
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

  const { nombre, link, presupuesto, tamano, DescripcionCliente, tipo, estatus, diseno, postprocesado, marketingEntrega, idConfiguracionCalculadora, TiempoOperandoHora, usoConsumible } = req.body;

  // Validar que los campos requeridos no sean string vacío ni null ni undefined
  if (
    !nombre || nombre.trim() === "" ||
    !link || link.trim() === "" ||
    presupuesto === undefined || presupuesto === null || presupuesto === "" ||
    !tamano || tamano.trim() === "" ||
    !DescripcionCliente || DescripcionCliente.trim() === "" ||
    !tipo || tipo.trim() === "" ||
    !estatus || estatus.trim() === "" ||
    diseno === undefined || diseno === null || diseno === "" ||
    postprocesado === undefined || postprocesado === null || postprocesado === "" ||
    marketingEntrega === undefined || marketingEntrega === null || marketingEntrega === "" ||
    !idConfiguracionCalculadora ||
    TiempoOperandoHora === undefined || TiempoOperandoHora === null || TiempoOperandoHora === ""
  ) {
    console.error('Faltan campos obligatorios');
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes y no vacíos.' });
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
        estatus,
        diseno: diseno != null ? String(diseno) : null,
        postprocesado: postprocesado != null ? String(postprocesado) : null,
        marketingEntrega: marketingEntrega != null ? String(marketingEntrega) : null,
        idConfiguracionCalculadora: parseInt(idConfiguracionCalculadora, 10),
        comentarios: null,
        TiempoOperandoHora: TiempoOperandoHora !== "" ? parseInt(TiempoOperandoHora, 10) : null,
        usoConsumible: usoConsumible !== undefined && usoConsumible !== "" ? parseInt(usoConsumible, 10) : null,
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
  const { nombre, link, presupuesto, tamano, DescripcionCliente, tipo, estatus, diseno, postprocesado, marketingEntrega, comentarios, idConfiguracionCalculadora, TiempoOperandoHora, usoConsumible } = req.body;

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
        estatus,
        diseno: diseno != null ? String(diseno) : null,
        postprocesado: postprocesado != null ? String(postprocesado) : null,
        marketingEntrega: marketingEntrega != null ? String(marketingEntrega) : null,
        comentarios,
        idConfiguracionCalculadora: idConfiguracionCalculadora ? parseInt(idConfiguracionCalculadora, 10) : null,
        TiempoOperandoHora: TiempoOperandoHora !== "" ? parseInt(TiempoOperandoHora, 10) : null,
        usoConsumible: usoConsumible !== undefined && usoConsumible !== "" ? parseInt(usoConsumible, 10) : null,
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
    console.log('Consulta recibida en /api/quotes');
    const quotes = await prisma.cotizacion.findMany({
      select: {
        id: true,
        nombre: true,
        link: true,
        presupuesto: true,
        estatus: true,
        tamano: true,
        tipo: true,
        DescripcionCliente: true,
        diseno: true,
        postprocesado: true,
        marketingEntrega: true,
        idConfiguracionCalculadora: true,
        comentarios: true,
      },
    });
    console.log('Datos obtenidos de la base de datos:', quotes);
    res.json(quotes);
  } catch (error) {
    console.error('Error al obtener las cotizaciones:', error);
    res.status(500).json({ error: 'Error al obtener las cotizaciones' });
  }
});

// Ruta para obtener todas las ventas
app.get('/api/ventas', async (req, res) => {
  try {
    const ventas = await prisma.ventas.findMany({
      select: {
        id: true,
        nombre: true,
        costoTotal: true,
        costoDiseno: true,
        costoMarketingEntrega: true,
        costoPostprocesado: true,
        costoImpresora: true,
        costoConsumible: true,
      },
    });
    res.json(ventas);
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    res.status(500).json({ error: 'Error al obtener las ventas' });
  }
});

// Ruta para registrar una nueva venta
app.post('/api/ventas', async (req, res) => {
  const { nombre, costoDiseno, costoMarketingEntrega, costoPostprocesado, costoImpresora, costoConsumible, costoTotal, usoConsumible } = req.body;
  try {
    // Buscar la última cotización con ese nombre base para obtener el idConfiguracionCalculadora y usoConsumible
    // El nombre de la venta es: "nombreCotizacion (Calculadora id)"
    // Extraer el nombre base y el id de la calculadora
    const match = nombre.match(/^(.*) \(Calculadora (\d+)\)$/);
    let utilizablesId = null;
    if (match) {
      const configId = match[2];
      // Buscar la configuración de calculadora
      const config = await prisma.configuracionCalculadora.findUnique({
        where: { id: parseInt(configId, 10) }
      });
      if (config) {
        utilizablesId = config.utilizablesId;
      }
    }

    // Registrar la venta
    const venta = await prisma.ventas.create({
      data: {
        nombre,
        costoDiseno,
        costoMarketingEntrega,
        costoPostprocesado,
        costoImpresora,
        costoConsumible,
        costoTotal,
      },
    });

    // Si hay consumible y cantidad a restar, actualiza el stock
    if (utilizablesId && usoConsumible && usoConsumible > 0) {
      await prisma.utilizables.update({
        where: { id: utilizablesId },
        data: {
          cantidadActual: {
            decrement: usoConsumible
          }
        }
      });
    }

    res.status(201).json({ message: 'Venta registrada exitosamente.', venta });
  } catch (error) {
    console.error('Error al registrar la venta:', error);
    res.status(500).json({ error: 'Error al registrar la venta.' });
  }
});

// Ruta para obtener todos los usuarios
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true, // Cambia 'nombre' por 'name'
        email: true,
        tipo: true,
      },
    });
    res.json(users);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// Obtener usuario por id
app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
      select: {
        id: true,
        name: true,
        email: true,
        tipo: true,
        edad: true,
      },
    });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});

// Actualizar usuario por id
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password, tipo, edad } = req.body;
  try {
    const data = {
      name,
      email,
      tipo,
      edad: edad ? parseInt(edad, 10) : undefined,
    };
    if (password && password.trim() !== '') {
      data.password = password;
    }
    const user = await prisma.user.update({
      where: { id: parseInt(id, 10) },
      data,
    });
    res.json({ message: 'Usuario actualizado exitosamente.', user });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});

// Rutas para Puestos
app.get('/api/puestos', async (req, res) => {
  try {
    const puestos = await prisma.puesto.findMany({
      select: {
        id: true,
        nombre: true,
        cuotaPorHora: true,
        estatus: true,
        descripcion: true,
      },
    });
    res.json(puestos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los puestos' });
  }
});

app.get('/api/puestos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const puesto = await prisma.puesto.findUnique({
      where: { id: parseInt(id, 10) },
      select: {
        id: true,
        nombre: true,
        cuotaPorHora: true,
        estatus: true,
        descripcion: true,
      },
    });
    if (!puesto) {
      return res.status(404).json({ error: 'Puesto no encontrado' });
    }
    res.json(puesto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el puesto' });
  }
});

app.post('/api/puestos', async (req, res) => {
  const { nombre, cuotaPorHora, estatus, descripcion } = req.body;
  try {
    const puesto = await prisma.puesto.create({
      data: {
        nombre,
        cuotaPorHora,
        estatus: parseInt(estatus, 10),
        descripcion,
      },
    });
    res.status(201).json(puesto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el puesto' });
  }
});

app.put('/api/puestos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, cuotaPorHora, estatus, descripcion } = req.body;
  try {
    const puesto = await prisma.puesto.update({
      where: { id: parseInt(id, 10) },
      data: {
        nombre,
        cuotaPorHora,
        estatus: parseInt(estatus, 10),
        descripcion,
      },
    });
    res.json(puesto);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el puesto' });
  }
});

app.delete('/api/puestos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const puesto = await prisma.puesto.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json({ message: 'Puesto eliminado exitosamente.', puesto });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el puesto' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
