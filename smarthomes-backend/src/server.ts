import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import os from 'os';
import path from 'path';

// Import Services & Routes
import { eventStream } from './services/eventStream.js';
import productsRouter from './routes/products.js';
import categoriesRouter from './routes/categories.js';
import ordersRouter from './routes/orders.js';
import paymentsRouter from './routes/payments.js';
import cmsRouter from './routes/cms.js';
import adminLockRouter from './routes/adminLock.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// Global CORS - allows connections from any device (localhost, LAN IP, or deployed Vercel apps)
app.use(cors({
  origin: true, // Echoes the origin header, allowing all origins safely
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

app.use(express.json({ limit: '10mb' }));

// Request Logger (Development visibility)
app.use((req, res, next) => {
  if (req.path !== '/api/health' && req.path !== '/api/events') {
    console.log(`[API] ${req.method} ${req.path}`);
  }
  next();
});

// --- REALTIME SERVER-SENT EVENTS (SSE) STREAM ---
app.get('/api/events', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const cleanup = eventStream.addClient(res);
  req.on('close', cleanup);
});

// --- HEALTH CHECK ENDPOINT ---
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'SmartHomes Unified API & Sync Engine',
    version: '1.0.0',
    activeSSEStreams: eventStream.getActiveClientCount()
  });
});

// --- MOUNT API ROUTERS ---
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/payment', paymentsRouter);
app.use('/api/cms', cmsRouter);
app.use('/api/admin', adminLockRouter);

// Function to find local network IP address
function getLocalNetworkIp(): string {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      // Look for IPv4 and non-internal (i.e. not 127.0.0.1)
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

app.listen(PORT, HOST, () => {
  const networkIp = getLocalNetworkIp();
  console.log('\n=============================================================');
  console.log('  🚀 SMARTHOMES UNIFIED BACKEND SERVER STARTED SUCCESSFULLY');
  console.log('=============================================================');
  console.log(`  🏠 Local Access:     http://localhost:${PORT}`);
  console.log(`  📱 Network Access:   http://${networkIp}:${PORT}`);
  console.log(`  ⚡ Realtime SSE:     http://${networkIp}:${PORT}/api/events`);
  console.log(`  💳 Razorpay Gateway: http://${networkIp}:${PORT}/api/payment`);
  console.log('-------------------------------------------------------------');
  console.log('  Ready for connections from SmartHome Store (:3000) & Admin Console (:3001)!');
  console.log('=============================================================\n');
});
