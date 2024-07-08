// src/seed.js
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Seed users
  const users = await prisma.user.createMany({
    data: [
      {
        username: "Admin",
        email: "admin123@example.com",
        password:
          "$2a$12$2klUwPZEj5TJfDXJbSJmned0faKh/.EEvk3QKKHZWDHoFEeJs7.oe",
        role: "admin",
      },
      {
        username: "User1",
        email: "user1@example.com",
        password:
          "$2a$12$Zae0oHYZgtv2ZamM5izG1uA73ToCRFug8ioobOhxChe0Qzbn/SNOW",
        role: "regular",
      },
    ],
  });
  console.log(`Seeded ${users.count} users`);

  // Seed products
  // const products = await prisma.product.createMany({
  //   data: [
  //     {
  //       title: "Product 1",
  //       price: 10000,
  //       description: "Description for product 1",
  //       img_url: "https://via.placeholder.com/150",
  //       available: true,
  //     },
  //     {
  //       title: "Product 2",
  //       price: 15000,
  //       description: "Description for product 2",
  //       img_url: "https://via.placeholder.com/150",
  //       available: true,
  //     },
  //     {
  //       title: "Product 3",
  //       price: 20000,
  //       description: "Description for product 3",
  //       img_url: "https://via.placeholder.com/150",
  //       available: true,
  //     },
  //   ],
  // });
  // console.log(`Seeded ${products.count} products`);

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
