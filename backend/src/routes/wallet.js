import express from 'express';
import { authMiddleware } from '../utils/authMiddleware.js';

const router = express.Router();

// GET /api/wallet
router.get('/', authMiddleware, async (req, res, next) => {
  const prisma = req.prisma;
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    const transactions = Array.isArray(user.transactions) ? user.transactions : [];
    return res.json({ balance: user.walletBalance, transactions });
  } catch (e) {
    return next(e);
  }
});

export default router;


