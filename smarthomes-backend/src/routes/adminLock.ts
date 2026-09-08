import { Router, Request, Response } from 'express';

const router = Router();

let activeAdminSessionId: string | null = null;
let activeAdminLastSeen: number = 0;
const SESSION_TIMEOUT_MS = 45000; // 45 seconds

const isLockActive = (requestSessionId?: string) => {
  const now = Date.now();
  const hasExpired = now - activeAdminLastSeen > SESSION_TIMEOUT_MS;
  if (hasExpired) return false;
  if (!activeAdminSessionId) return false;
  return requestSessionId !== activeAdminSessionId;
};

// GET /api/admin/lock-status
router.get('/lock-status', (req: Request, res: Response) => {
  const sessionId = req.query.sessionId as string;
  const locked = isLockActive(sessionId);
  res.json({ isLocked: locked });
});

// POST /api/admin/heartbeat
router.post('/heartbeat', (req: Request, res: Response) => {
  const { sessionId } = req.body;
  if (!sessionId) {
    res.status(400).json({ error: 'sessionId is required' });
    return;
  }

  const locked = isLockActive(sessionId);
  if (locked) {
    res.status(403).json({ error: 'Admin panel is locked by another active session' });
    return;
  }

  activeAdminSessionId = sessionId;
  activeAdminLastSeen = Date.now();
  res.json({ success: true, message: 'Heartbeat registered' });
});

// POST /api/admin/lock
router.post('/lock', (req: Request, res: Response) => {
  const { sessionId } = req.body;
  if (!sessionId) {
    res.status(400).json({ error: 'sessionId is required' });
    return;
  }

  const locked = isLockActive(sessionId);
  if (locked) {
    res.status(403).json({ error: 'Admin panel is already locked by another session' });
    return;
  }

  activeAdminSessionId = sessionId;
  activeAdminLastSeen = Date.now();
  res.json({ success: true });
});

// POST /api/admin/unlock
router.post('/unlock', (req: Request, res: Response) => {
  const { sessionId } = req.body;
  if (sessionId === activeAdminSessionId) {
    activeAdminSessionId = null;
    activeAdminLastSeen = 0;
  }
  res.json({ success: true });
});

export default router;
