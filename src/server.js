import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './env.js';
import contactsRouter from './routes/contacts.js'; // Ensure the correct path for the router

const PORT = Number(env('PORT', '3000'));

const app = express();

export const setupServer = () => {
  // Middleware
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // Basic route
  app.get('/', async (req, res) => {
    res.status(200).json({
      message: 'Hello! This is my DataBase',
    });
  });

  // Use the contactsRouter for any route starting with /api/contacts
  app.use('/api/contacts', contactsRouter);

  // Error handling middleware
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  // Catch-all route for undefined paths
  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
