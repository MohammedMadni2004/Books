import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function cleanDatabase() {
  await prisma.review.deleteMany({});
  await prisma.book.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('Database cleaned');
}

async function main() {
  try {
    await cleanDatabase();

    const hashedPassword = await bcrypt.hash("MdMadni@9", 10);
    const adminUser = await prisma.user.create({
      data: {
        name: "Madni",
        email: "mohammedmadniok@gmail.com",
        password: hashedPassword,
        role: "ADMIN",
      },
    });
    console.log("Admin user created:", adminUser);

    const category1 = await prisma.category.create({
      data: { name: "Science Fiction" },
    });

    const category2 = await prisma.category.create({
      data: { name: "Self-Help" },
    });

    const category3 = await prisma.category.create({
      data: { name: "Biography" },
      select:{id:true}
    });

    console.log("Categories created");

    const book1 = await prisma.book.create({
      data: {
        name: "Dune",
        author: "Frank Herbert",
        categories: {
          connect: [{ id: category1.id }],
        },
      },
    });

    const book2 = await prisma.book.create({
      data: {
        name: "Atomic Habits",
        author: "James Clear",
        categories: {
          connect: [{ id: category2.id }],
        },
      },
    });

    const book3 = await prisma.book.create({
      data: {
        name: "The Diary of a Young Girl",
        author: "Anne Frank",
        categories: {
          connect: [{ id: category3.id }],
        },
      },
    });

    console.log("Books created");

    // Fixed review creation
    const review1 = await prisma.review.create({
      data: {
        title: "A Masterpiece of Sci-Fi",
        description: "An epic tale of politics, religion, and ecology.",
        stars: 5,
        userId: adminUser.id,  // Direct assignment of userId
        bookId: book1.id,      // Direct assignment of bookId
      },
    });

    const review2 = await prisma.review.create({
      data: {
        title: "Life-Changing Book",
        description: "A must-read for anyone looking to improve their habits.",
        stars: 5,
        userId: adminUser.id,
        bookId: book2.id,
      },
    });

    const review3 = await prisma.review.create({
      data: {
        title: "Inspirational and Touching",
        description: "A moving account of resilience and hope during WWII.",
        stars: 5,
        userId: adminUser.id,
        bookId: book3.id,
      },
    });

    console.log("Reviews created");
  } catch (error) {
    console.error("Seeding error:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
