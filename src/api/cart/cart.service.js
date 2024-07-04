const prisma = require("../../database");
const {
  findCartsByUserId,
  insertProductToCart,
  updateQuantityByCartId,
  deleteCartItem,
  findCartItemById,
} = require("./cart.repository");

const getCartItemById = async (id) => {
  const cart = await findCartItemById(id);
  if (!cart) {
    throw Error("Cart Not Found");
  }
  return cart;
};

const getCartsByUserId = async (userId) => {
  return await findCartsByUserId(userId);
};

const addProductToCart = async (userId, productId, quantity) => {
  const existingCartEntry = await prisma.cart.findFirst({
    where: {
      userId: parseInt(userId),
      productId: parseInt(productId),
    },
  });

  if (existingCartEntry) {
    await prisma.cart.update({
      where: {
        id: existingCartEntry.id,
      },
      data: {
        quantity: existingCartEntry.quantity + parseInt(quantity),
      },
    });
  } else {
    await insertProductToCart(userId, quantity, productId);
  }

  const userCarts = await getCartsByUserId(userId);
  return userCarts;
};

const patchCartById = async (id, quantity) => {
  await getCartItemById(id);
  const updatedCart = await updateQuantityByCartId(id, quantity);
  return updatedCart;
};

const deleteCartById = async (id) => {
  await getCartItemById(id);
  await deleteCartItem(id);
};

module.exports = {
  getCartsByUserId,
  addProductToCart,
  patchCartById,
  deleteCartById,
};
