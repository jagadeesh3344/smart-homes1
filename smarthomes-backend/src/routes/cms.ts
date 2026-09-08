import { Router, Request, Response } from 'express';
import { dbService } from '../services/db.js';

const router = Router();

// Offers
router.get('/offers', (_req: Request, res: Response) => {
  res.json(dbService.getOffers());
});

router.post('/offers', (req: Request, res: Response) => {
  res.json(dbService.saveOffer(req.body));
});

router.delete('/offers/:id', (req: Request, res: Response) => {
  const success = dbService.deleteOffer(req.params.id);
  res.json({ success });
});

// FAQs
router.get('/faqs', (_req: Request, res: Response) => {
  res.json(dbService.getFAQs());
});

router.post('/faqs', (req: Request, res: Response) => {
  res.json(dbService.saveFAQ(req.body));
});

router.delete('/faqs/:id', (req: Request, res: Response) => {
  const success = dbService.deleteFAQ(req.params.id);
  res.json({ success });
});

// Videos
router.get('/videos', (_req: Request, res: Response) => {
  res.json(dbService.getVideos());
});

router.post('/videos', (req: Request, res: Response) => {
  res.json(dbService.saveVideo(req.body));
});

router.delete('/videos/:id', (req: Request, res: Response) => {
  const success = dbService.deleteVideo(req.params.id);
  res.json({ success });
});

// Homepage Config
router.get('/homepage', (_req: Request, res: Response) => {
  res.json(dbService.getHomepage());
});

router.post('/homepage', (req: Request, res: Response) => {
  res.json(dbService.saveHomepage(req.body));
});

// System Settings
router.get('/settings', (_req: Request, res: Response) => {
  res.json(dbService.getSettings());
});

router.post('/settings', (req: Request, res: Response) => {
  res.json(dbService.saveSettings(req.body));
});

// SEO
router.get('/seo', (_req: Request, res: Response) => {
  res.json(dbService.getSEO());
});

router.post('/seo', (req: Request, res: Response) => {
  res.json(dbService.saveSEO(req.body));
});

export default router;
