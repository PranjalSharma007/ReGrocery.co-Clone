import express from 'express';
import { authMiddleware } from '../utils/authMiddleware.js';

const router = express.Router();

function normalizeCart(cart) {
  return Array.isArray(cart) ? cart : [];
}

// POST /api/orders/create { address, useWallet }
router.post('/create', authMiddleware, async (req, res, next) => {
  const prisma = req.prisma;
  try {
    const { address, useWallet } = req.body || {};
    if (!address || typeof address !== 'object') return res.status(400).json({ error: 'Address required' });

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    const cart = normalizeCart(user.cart);
    if (cart.length === 0) return res.status(400).json({ error: 'Cart is empty' });

    const productIds = cart.map(i => i.productId);
    const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

    const subtotal = cart.reduce((sum, i) => {
      const p = products.find(p => p.id === i.productId);
      return sum + (p ? Number(p.price) * i.qty : 0);
    }, 0);
    const delivery = 5;
    const total = subtotal + delivery;

    let walletDeducted = 0;
    if (useWallet) {
      const balance = Number(user.walletBalance || 0);
      if (balance >= total) {
        walletDeducted = total;
      } else {
        return res.status(400).json({ error: 'Insufficient wallet balance' });
      }
    }

    // placeholder stripe behavior
    const stripeId = walletDeducted === total ? null : 'stripe_placeholder';

    const order = await prisma.$transaction(async (tx) => {
      if (walletDeducted > 0) {
        await tx.user.update({
          where: { id: user.id },
          data: {
            walletBalance: { decrement: walletDeducted },
            transactions: {
              set: Array.isArray(user.transactions)
                ? [...user.transactions, { type: 'deduct', amount: String(walletDeducted.toFixed(2)), date: new Date().toISOString() }]
                : [{ type: 'deduct', amount: String(walletDeducted.toFixed(2)), date: new Date().toISOString() }]
            }
          }
        });
      }

      const created = await tx.order.create({
        data: {
          userId: user.id,
          total: total,
          walletDeducted: walletDeducted,
          status: 'pending',
          address: address,
          stripeId: stripeId,
          items: {
            create: cart.map(i => {
              const p = products.find(p => p.id === i.productId);
              return { productId: i.productId, qty: i.qty, price: p ? p.price : 0 };
            })
          }
        },
        include: { items: true }
      });

      await tx.user.update({ where: { id: user.id }, data: { cart: [] } });
      return created;
    });

    return res.json({ order });
  } catch (e) {
    return next(e);
  }
});

// GET /api/orders
router.get('/', authMiddleware, async (req, res, next) => {
  const prisma = req.prisma;
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      include: { items: true }
    });
    return res.json({ orders });
  } catch (e) {
    return next(e);
  }
});

export default router;


