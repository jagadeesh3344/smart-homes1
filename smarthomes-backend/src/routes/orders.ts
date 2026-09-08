import { Router, Request, Response } from 'express';
import { dbService } from '../services/db.js';
import { mailService } from '../services/mailService.js';

const router = Router();

// GET /api/orders - list all orders
router.get('/', (_req: Request, res: Response) => {
  try {
    const orders = dbService.getOrders();
    res.json(orders);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve orders', message: err.message });
  }
});

// GET /api/orders/:id - single order
router.get('/:id', (req: Request, res: Response) => {
  try {
    const order = dbService.getOrderById(req.params.id);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json(order);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch order', message: err.message });
  }
});

// GET /api/orders/:id/invoice-html - view rendered HTML invoice in browser
router.get('/:id/invoice-html', (req: Request, res: Response) => {
  try {
    const order = dbService.getOrderById(req.params.id);
    if (!order) {
      res.status(404).send('Order not found');
      return;
    }
    const html = mailService.generateInvoiceHtml(order);
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (err: any) {
    res.status(500).send('Error rendering invoice: ' + err.message);
  }
});

// POST /api/orders - place an order or enquiry (decrements stock atomically & sends invoice email)
router.post('/', (req: Request, res: Response) => {
  try {
    const { customerName, customerEmail, totalAmount } = req.body;
    if (!customerName || !customerEmail) {
      res.status(400).json({ error: 'Customer name and email are required' });
      return;
    }

    const order = dbService.createOrder(req.body);

    // Send invoice email asynchronously to customer
    mailService.sendOrderInvoiceEmail(order).catch(err => {
      console.warn('[Order Mail] Background dispatch warning:', err.message || err);
    });

    res.status(201).json(order);
  } catch (err: any) {
    res.status(400).json({ error: 'Failed to place order', message: err.message });
  }
});

// PATCH /api/orders/:id/status - update fulfillment / payment status
router.patch('/:id/status', (req: Request, res: Response) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const updated = dbService.updateOrderStatus(req.params.id, {
      ...(orderStatus && { orderStatus }),
      ...(paymentStatus && { paymentStatus })
    });

    if (!updated) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: 'Failed to update order status', message: err.message });
  }
});

// GET /api/orders/customers/all - list customer ledger
router.get('/customers/all', (_req: Request, res: Response) => {
  try {
    const customers = dbService.getCustomers();
    res.json(customers);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch customers', message: err.message });
  }
});

// POST /api/orders/customers - register or update customer
router.post('/customers', (req: Request, res: Response) => {
  try {
    const { name, email, phone, addresses } = req.body;
    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }
    const cust = dbService.registerCustomer({ name: name || email.split('@')[0], email, phone, addresses });
    res.status(201).json(cust);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to register customer', message: err.message });
  }
});

// PATCH /api/orders/customers/:id - update customer account or status
router.patch('/customers/:id', (req: Request, res: Response) => {
  try {
    const updated = dbService.updateCustomer(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: 'Failed to update customer', message: err.message });
  }
});

export default router;
