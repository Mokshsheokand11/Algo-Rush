import express from 'express';
import { User } from '../models/User.js';
import { authenticate } from '../middleware/auth.js';
import { getPublicKey } from '../services/push.js';

const router = express.Router();

router.get('/vapid-public-key', (req: any, res: any) => {
  res.json({ publicKey: getPublicKey() });
});

router.post('/register', authenticate, async (req: any, res: any) => {
  try {
    const { subscription } = req.body;
    
    if (!subscription) {
      return res.status(400).json({ error: 'Subscription is required' });
    }

    await User.findByIdAndUpdate(req.userId, { pushSubscription: subscription });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register notification subscription' });
  }
});

export default router;
