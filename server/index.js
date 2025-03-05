const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(cors());

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
    console.log('User registered:', user);
    res.status(200).send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
