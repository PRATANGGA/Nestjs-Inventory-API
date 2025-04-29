import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Bersihkan data sebelumnya (perhatikan urutan relasi)
  await prisma.items.deleteMany();
  await prisma.suppliers.deleteMany();
  await prisma.category.deleteMany();
  await prisma.admins.deleteMany();

  // 1. Seed Admins
  const adminCount = 3;
  const admins = await Promise.all(
    Array.from({ length: adminCount }).map(() =>
      prisma.admins.create({
        data: {
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email(),
        },
      }),
    ),
  );

  console.log(`✅ Inserted ${admins.length} admins`);

  // 2. Seed Categories
  const categoryCount = 5;
  const categories = await Promise.all(
    Array.from({ length: categoryCount }).map(() =>
      prisma.category.create({
        data: {
          name:
            faker.commerce.department() +
            faker.number.int({ min: 1, max: 999 }),
          description: faker.commerce.productDescription(),
          createdBy: faker.helpers.arrayElement(admins).id,
        },
      }),
    ),
  );

  console.log(`✅ Inserted ${categories.length} categories`);

  // 3. Seed Suppliers
  const supplierCount = 5;
  const suppliers = await Promise.all(
    Array.from({ length: supplierCount }).map(() =>
      prisma.suppliers.create({
        data: {
          name: faker.company.name(),
          contactInfo: faker.phone.number(),
          createdBy: faker.helpers.arrayElement(admins).id,
        },
      }),
    ),
  );

  console.log(`✅ Inserted ${suppliers.length} suppliers`);

  // 4. Seed Items
  const itemCount = 20;
  const items = await Promise.all(
    Array.from({ length: itemCount }).map(() =>
      prisma.items.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: parseFloat(faker.commerce.price({ min: 10000, max: 1000000 })),
          quantity: faker.number.int({ min: 1, max: 100 }),
          categoryId: faker.helpers.arrayElement(categories).id,
          supplierId: faker.helpers.arrayElement(suppliers).id,
          createdBy: faker.helpers.arrayElement(admins).id,
        },
      }),
    ),
  );

  console.log(`✅ Inserted ${items.length} items`);
}

main()
  .then(() => {
    console.log('🌱 Seeding selesai!');
  })
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
