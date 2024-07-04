const prisma = require("../../database");

const findCartItemById = async (id) => {
  const cart = await prisma.cart.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return cart;
};

const findCartsByUserId = async (userId) => {
  const userCarts = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
    include: {
      Carts: {
        include: {
          product: true,
        },
      },
    },
  });
  return userCarts.Carts;
};

const findExistingCartEntry = async (userId, productId) => {
  const existingCartEntry = await prisma.cart.findFirst({
    where: {
      userId: parseInt(userId),
      productId: parseInt(productId),
    },
  });
  return existingCartEntry;
};

const updateCartEntry = async (id, quantity) => {
  await prisma.cart.update({
    where: {
      id: id,
    },
    data: {
      quantity: {
        increment: parseInt(quantity),
      },
    },
  });
};

const insertProductToCart = async (userId, quantity, productId) => {
  await prisma.cart.create({
    data: {
      quantity: parseInt(quantity),
      userId: parseInt(userId),
      productId: parseInt(productId),
    },
  });
};

const updateQuantityByCartId = async (id, quantity) => {
  const updatedCart = await prisma.cart.update({
    where: {
      id: parseInt(id),
    },
    data: {
      quantity: parseInt(quantity),
    },
    include: {
      product: true,
    },
  });
  return updatedCart;
};

const deleteCartItem = async (id) => {
  await prisma.cart.delete({
    where: {
      id: parseInt(id),
    },
  });
};

module.exports = {
  findCartItemById,
  findCartsByUserId,
  findExistingCartEntry,
  insertProductToCart,
  updateQuantityByCartId,
  deleteCartItem,
  updateCartEntry,
};
