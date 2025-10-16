import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const sample = [
    { name: 'Organic Apples', price: 2.99, category: 'produce', tags: ['zero-waste'], imageUrl: 'https://picsum.photos/seed/apple/200/200' },
    { name: 'Bananas', price: 1.49, category: 'produce', tags: ['fruit'], imageUrl: 'https://picsum.photos/seed/banana/200/200' },
    { name: 'Almond Milk', price: 3.99, category: 'dairy', tags: ['plant-based'], imageUrl: 'https://picsum.photos/seed/almond/200/200' },
    { name: 'Organic Oats', price: 4.49, category: 'grains', tags: ['breakfast'], imageUrl: 'https://picsum.photos/seed/oats/200/200' },
    { name: 'Kale', price: 2.29, category: 'produce', tags: ['greens'], imageUrl: 'https://picsum.photos/seed/kale/200/200' },
    { name: 'Zero-waste Soap', price: 5.99, category: 'home', tags: ['zero-waste'], imageUrl: 'https://picsum.photos/seed/soap/200/200' },
    { name: 'Brown Rice', price: 3.29, category: 'grains', tags: ['staples'], imageUrl: 'https://picsum.photos/seed/rice/200/200' },
    { name: 'Organic Eggs', price: 4.99, category: 'dairy', tags: ['protein'], imageUrl: 'https://picsum.photos/seed/eggs/200/200' },
    { name: 'Tomatoes', price: 2.59, category: 'produce', tags: ['veggies'], imageUrl: 'https://picsum.photos/seed/tomato/200/200' },
    { name: 'Olive Oil', price: 7.99, category: 'pantry', tags: ['oil'], imageUrl: 'https://picsum.photos/seed/olive/200/200' }
  ];

  await prisma.product.createMany({ data: sample });
  console.log('Seeded products');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});


