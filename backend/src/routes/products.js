import express from 'express';

const router = express.Router();

// GET /api/products?category=&tag=&price_min=&price_max=&page=
router.get('/', async (req, res, next) => {
  const prisma = req.prisma;
  try {
    const { category, tag, price_min, price_max, page = 1 } = req.query;
    const take = 20;
    const skip = (Math.max(Number(page) || 1, 1) - 1) * take;

    const where = {};
    if (category) where.category = String(category);
    if (tag) where.tags = { has: String(tag) };
    if (price_min || price_max) {
      where.price = {};
      if (price_min) where.price.gte = Number(price_min);
      if (price_max) where.price.lte = Number(price_max);
    }

    const [items, total] = await Promise.all([
      prisma.product.findMany({ where, skip, take, orderBy: { id: 'asc' } }),
      prisma.product.count({ where })
    ]);

    return res.json({ items, page: Number(page) || 1, pageSize: take, total });
  } catch (e) {
    return next(e);
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  const prisma = req.prisma;
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: 'Invalid id' });
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(404).json({ error: 'Not found' });
    return res.json(product);
  } catch (e) {
    return next(e);
  }
});

export default router;


