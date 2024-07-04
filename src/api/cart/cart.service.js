const { findProductsById } = require("../product/product.repository");
const {
  findCartsByUserId,
  insertProductToCart,
  updateQuantityByCartId,
  deleteCartItem,
  findCartItemById,
  findExistingCartEntry,
  updateCartEntry,
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
  const existingCartEntry = await findExistingCartEntry(userId, productId);

  if (existingCartEntry) {
    await updateCartEntry(existingCartEntry.id, quantity);
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
