import express from 'express';
import { authMiddleware } from '../utils/authMiddleware.js';

const router = express.Router();

function normalizeCart(cart) {
  return Array.isArray(cart) ? cart : [];
}

// POST /api/cart/add { productId, qty }
router.post('/add', authMiddleware, async (req, res, next) => {
  const prisma = req.prisma;
  try {
    const { productId, qty } = req.body || {};
    const pid = Number(productId);
    const quantity = Number(qty);
    if (!pid || !quantity || quantity < 1) return res.status(400).json({ error: 'Invalid payload' });

    // validate product exists
    const product = await prisma.product.findUnique({ where: { id: pid } });
    if (!product) return res.status(400).json({ error: 'Product not found' });

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    const cart = normalizeCart(user.cart);
    const idx = cart.findIndex(i => i.productId === pid);
    if (idx >= 0) cart[idx].qty += quantity; else cart.push({ productId: pid, qty: quantity });

    const updated = await prisma.user.update({ where: { id: user.id }, data: { cart: cart } });
    return res.json({ cart: updated.cart });
  } catch (e) {
    return next(e);
  }
});

// GET /api/cart
router.get('/', authMiddleware, async (req, res, next) => {
  const prisma = req.prisma;
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    const cart = normalizeCart(user.cart);
    const productIds = cart.map(i => i.productId);
    const products = productIds.length
      ? await prisma.product.findMany({ where: { id: { in: productIds } } })
      : [];
    const details = cart.map(i => ({
      ...i,
      product: products.find(p => p.id === i.productId) || null
    }));
    return res.json({ items: details });
  } catch (e) {
    return next(e);
  }
});

// PUT /api/cart/update { itemIndex, qty }
router.put('/update', authMiddleware, async (req, res, next) => {
  const prisma = req.prisma;
  try {
    const { itemIndex, qty } = req.body || {};
    const idx = Number(itemIndex);
    const quantity = Number(qty);
    if (idx < 0 || !Number.isInteger(idx) || !quantity || quantity < 1) return res.status(400).json({ error: 'Invalid payload' });
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    const cart = normalizeCart(user.cart);
    if (idx >= cart.length) return res.status(400).json({ error: 'Index out of range' });
    cart[idx].qty = quantity;
    const updated = await prisma.user.update({ where: { id: user.id }, data: { cart } });
    return res.json({ cart: updated.cart });
  } catch (e) {
    return next(e);
  }
});

// DELETE /api/cart/remove { productId }
router.delete('/remove', authMiddleware, async (req, res, next) => {
  const prisma = req.prisma;
  try {
    const { productId } = req.body || {};
    const pid = Number(productId);
    if (!pid) return res.status(400).json({ error: 'Invalid productId' });
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    const cart = normalizeCart(user.cart).filter(i => i.productId !== pid);
    const updated = await prisma.user.update({ where: { id: user.id }, data: { cart } });
    return res.json({ cart: updated.cart });
  } catch (e) {
    return next(e);
  }
});

// GET /api/cart/total
router.get('/total', authMiddleware, async (req, res, next) => {
  const prisma = req.prisma;
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    const cart = normalizeCart(user.cart);
    const productIds = cart.map(i => i.productId);
    const products = productIds.length
      ? await prisma.product.findMany({ where: { id: { in: productIds } } })
      : [];
    const subtotal = cart.reduce((sum, i) => {
      const p = products.find(p => p.id === i.productId);
      return sum + (p ? Number(p.price) * i.qty : 0);
    }, 0);
    const delivery = 5;
    const total = subtotal + delivery;
    return res.json({ subtotal, delivery, total });
  } catch (e) {
    return next(e);
  }
});

export default router;


