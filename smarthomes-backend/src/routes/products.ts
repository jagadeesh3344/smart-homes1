import { Router, Request, Response } from 'express';
import { dbService } from '../services/db.js';

const router = Router();

// GET /api/products - list all products with filtering
router.get('/', (req: Request, res: Response) => {
  try {
    const { categoryId, search, featured, status } = req.query;
    const products = dbService.getProducts({
      categoryId: categoryId as string,
      search: search as string,
      featuredOnly: featured === 'true',
      status: status as string
    });
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve products', message: err.message });
  }
});

// GET /api/products/:id - single product
router.get('/:id', (req: Request, res: Response) => {
  try {
    const product = dbService.getProductById(req.params.id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch product', message: err.message });
  }
});

// POST /api/products - create or update product
router.post('/', (req: Request, res: Response) => {
  try {
    const saved = dbService.saveProduct(req.body);
    res.status(201).json(saved);
  } catch (err: any) {
    res.status(400).json({ error: 'Failed to save product', message: err.message });
  }
});

// PUT /api/products/:id - update product
router.put('/:id', (req: Request, res: Response) => {
  try {
    const saved = dbService.saveProduct({ ...req.body, id: req.params.id });
    res.json(saved);
  } catch (err: any) {
    res.status(400).json({ error: 'Failed to update product', message: err.message });
  }
});

// DELETE /api/products/:id - delete product
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const success = dbService.deleteProduct(req.params.id);
    if (!success) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete product', message: err.message });
  }
});

export default router;
