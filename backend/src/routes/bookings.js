import express from 'express';
import { authMiddleware } from '../utils/authMiddleware.js';

const router = express.Router();

// POST /api/bookings { name, email, eventType, date, message }
router.post('/', async (req, res, next) => {
  const prisma = req.prisma;
  try {
    const { name, email, eventType, date, message } = req.body || {};
    if (!name || !email || !eventType || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const created = await prisma.booking.create({
      data: {
        name,
        email,
        eventType,
        date: new Date(date),
        message: message || null
      }
    });
    return res.json({ booking: created });
  } catch (e) {
    return next(e);
  }
});

export default router;


