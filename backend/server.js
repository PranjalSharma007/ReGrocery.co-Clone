import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';

import authRoutes from './src/routes/auth.js';
import productsRoutes from './src/routes/products.js';
import cartRoutes from './src/routes/cart.js';
import ordersRoutes from './src/routes/orders.js';
import bookingsRoutes from './src/routes/bookings.js';
import walletRoutes from './src/routes/wallet.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Security
app.use(helmet());
app.use(cors({ origin: '*', credentials: true }));

// Parsers
app.use(express.json());

// Health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Note: OTP rate limiting is configured inside the auth routes to avoid circular imports

// Attach prisma to req
app.use((req, _res, next) => {
  req.prisma = prisma;
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/wallet', walletRoutes);

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

const port = process.env.PORT || 3000;

async function start() {
  try {
    await prisma.$connect();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (e) {
    console.error('Failed to start server', e);
    process.exit(1);
  }
}

start();


