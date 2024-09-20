const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;
  const password = 'contraseña';

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Crear usuarios
  const user1 = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@hotmail.com',
      password: hashedPassword,
      tipo: '1',
      edad: 30, 
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Regular User',
      email: 'user@hotmail.com',
      password: hashedPassword,
      tipo: '2',
      edad: 25, 
    },
  });

  console.log('Usuarios creados:', { user1, user2 });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
