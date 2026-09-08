import { Router, Request, Response } from 'express';
import { dbService } from '../services/db.js';

const router = Router();

// GET /api/categories
router.get('/', (_req: Request, res: Response) => {
  try {
    const categories = dbService.getCategories();
    res.json(categories);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve categories', message: err.message });
  }
});

// POST /api/categories - create or update category
router.post('/', (req: Request, res: Response) => {
  try {
    const category = dbService.saveCategory(req.body);
    res.status(201).json(category);
  } catch (err: any) {
    res.status(400).json({ error: 'Failed to save category', message: err.message });
  }
});

// DELETE /api/categories/:id
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const success = dbService.deleteCategory(req.params.id);
    if (!success) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete category', message: err.message });
  }
});

export default router;
