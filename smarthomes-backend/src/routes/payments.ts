import { Router, Request, Response } from 'express';
import crypto from 'crypto';

const router = Router();

// POST /api/payment/create-order
router.post('/create-order', async (req: Request, res: Response) => {
  try {
    const { amount, currency = 'INR', receipt, items } = req.body;

    if (!amount || amount <= 0) {
      res.status(400).json({ error: 'Invalid order amount' });
      return;
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const amountInPaise = Math.round(Number(amount) * 100);

    // If official Razorpay credentials provided, connect directly to Razorpay API
    if (keyId && keySecret) {
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency,
          receipt: receipt || `rcpt_${Date.now()}`,
          notes: {
            source: 'Aetheria Smart Home Ecosystem'
          }
        })
      });

      const data: any = await response.json();
      if (data.error) {
        res.status(400).json({ error: data.error.description || 'Razorpay order creation failed' });
      } else {
        res.json({
          id: data.id,
          amount: data.amount,
          currency: data.currency,
          receipt: data.receipt,
          status: data.status,
          key: keyId
        });
      }
    } else {
      // Seamless simulated mode for final project demonstration without live payment gateway fees
      const simulatedOrderId = `order_${crypto.randomBytes(8).toString('hex')}`;
      res.json({
        id: simulatedOrderId,
        amount: amountInPaise,
        currency,
        receipt: receipt || `rcpt_${Date.now()}`,
        status: 'created',
        key: 'rzp_test_simulated_key_id',
        simulated: true,
        message: 'Order created in test simulation mode'
      });
    }
  } catch (error: any) {
    res.status(500).json({ error: 'Internal order initialization failed', details: error.message });
  }
});

// POST /api/payment/verify
router.post('/verify', (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, simulated } = req.body;

    if (simulated) {
      res.json({
        success: true,
        status: 'Paid',
        message: 'Payment verified successfully (Simulated Test Mode)'
      });
      return;
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      res.status(500).json({ error: 'Razorpay secret key is not configured on the server.' });
      return;
    }

    // Cryptographic HMAC SHA256 verification
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
      .createHmac('sha256', keySecret)
      .update(text)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      res.json({
        success: true,
        status: 'Paid',
        message: 'Payment verified and signature matched successfully.'
      });
    } else {
      res.status(400).json({
        success: false,
        status: 'Failed',
        error: 'Payment verification failed: Signature mismatch.'
      });
    }
  } catch (error: any) {
    res.status(500).json({ error: 'Signature verification failure', details: error.message });
  }
});

export default router;
