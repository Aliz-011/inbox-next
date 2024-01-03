import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const labels = await prisma.label.createMany({
    data: [
      {
        id: '2ea37179-418a-4ec6-9fc2-b9c17590d83e',
        name: 'work',
      },
      {
        id: 'e6c4bea1-869c-47b4-a836-075ce76f1826',
        name: 'chill',
      },
      {
        id: '1ef238e9-eb9f-4b8a-950f-d28723acc647',
        name: 'important',
      },
      {
        id: '022b2e00-f79e-4470-9d58-e4c8dfdf4cc5',
        name: 'meeting',
      },
    ],
    skipDuplicates: true,
  });
  console.log({ labels });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
