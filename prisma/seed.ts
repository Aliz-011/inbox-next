import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const labels = await prisma.label.createMany({
    data: [
      {
        id: '2ea37179-418a-4ec6-9fc2-b9c17590d83e',
        name: 'Work',
      },
      {
        id: 'e6c4bea1-869c-47b4-a836-075ce76f1826',
        name: 'Chill',
      },
      {
        id: '1ef238e9-eb9f-4b8a-950f-d28723acc647',
        name: 'Important',
      },
      {
        id: '022b2e00-f79e-4470-9d58-e4c8dfdf4cc5',
        name: 'Urgent',
      },
      {
        id: 'cd46ac85-b018-4162-a458-09729f094559',
        name: 'Personal',
      },
      {
        id: '03afe676-ee1c-4ee1-b8dd-4e0b6359e670',
        name: 'Travel',
      },
      {
        id: 'a3970ee5-50c2-4901-939d-8a33966acbf4',
        name: 'Finance',
      },
    ],
    skipDuplicates: true,
  });

  // const folders = await prisma.folder.createMany({
  //   data: [
  //     {
  //       id: '53cb8392-0152-4167-a68d-a4f844002d64',
  //       name: 'Inbox',
  //     },
  //     {
  //       id: '5648bf74-70cf-46cf-8155-2959cc828a98',
  //       name: 'Draft',
  //     },
  //     {
  //       id: '18ed3f92-e462-4048-ad67-0c31ec2aaa15',
  //       name: 'Archived',
  //     },
  //     {
  //       id: '1f0ec23a-5d02-40df-814b-a2df6e578730',
  //       name: 'Sent',
  //     },
  //   ],
  // });
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
