import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

async function main() {
  // Create an admin user
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

  // Create categories
  const category1 = await prisma.category.create({
    data: { name: "Science Fiction" },
  });

  const category2 = await prisma.category.create({
    data: { name: "Self-Help" },
  });

  const category3 = await prisma.category.create({
    data: { name: "Biography" },
  });

  console.log("Categories created:", category1, category2, category3);

  // Create books and associate with categories
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

  console.log("Books created:", book1, book2, book3);

  // Create reviews for books
  const review1 = await prisma.review.create({
    data: {
      title: "A Masterpiece of Sci-Fi",
      description: "An epic tale of politics, religion, and ecology.",
      stars: 5,
      user: {
        connect: { id: adminUser.id },
      },
      book: {
        connect: { id: book1.id },
      },
    },
  });

  const review2 = await prisma.review.create({
    data: {
      title: "Life-Changing Book",
      description: "A must-read for anyone looking to improve their habits.",
      stars: 5,
      user: {
        connect: { id: adminUser.id },
      },
      book: {
        connect: { id: book2.id },
      },
    },
  });

  const review3 = await prisma.review.create({
    data: {
      title: "Inspirational and Touching",
      description: "A moving account of resilience and hope during WWII.",
      stars: 5,
      user: {
        connect: { id: adminUser.id },
      },
      book: {
        connect: { id: book3.id },
      },
    },
  });

  console.log("Reviews created:", review1, review2, review3);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
