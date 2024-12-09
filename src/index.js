import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  try {
    await initMongoConnection(); // Встановлюємо з'єднання з MongoDB
    setupServer(); // Запускаємо сервер
  } catch (err) {
    console.error('Error during bootstrap:', err);
    process.exit(1); // Завершуємо процес у разі помилки
  }
};

bootstrap();
