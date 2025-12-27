import dotenv from 'dotenv';
import app from './app';
import prisma from './lib/prisma';

dotenv.config();

const port = Number(process.env.PORT) || 4000;

async function bootstrap() {
  try {
    // Initialize Demo User if it doesn't exist
    await prisma.user.upsert({
      where: { email: 'demo@local.dev' },
      update: {},
      create: {
        email: 'demo@local.dev',
        name: 'Demo User',
      },
    });

    app.listen(port, () => {
      console.log(`🚀 API ready at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();

