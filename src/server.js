const express = require('express');
const cors = require('cors');
const logger = require('pino')();

const setupServer = () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // 404 route handler
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Start server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};

module.exports = setupServer;
