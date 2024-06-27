const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CartRepository {
  async createCart(userId, productId, quantity) {
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) throw new Error('Product not found');

    const totalPrice = product.price * quantity;

    return prisma.cart.create({
      data: {
        userId,
        productId,
        quantity,
        price: product.price,
        totalPrice
      }
    });
  }

  async getCartByUserId(userId) {
    return prisma.cart.findMany({
      where: { userId },
      include: { Product: true }
    });
  }

  async updateCart(cartId, quantity) {
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { Product: true }
    });

    if (!cart) throw new Error('Cart not found');

    const totalPrice = cart.Product.price * quantity;

    return prisma.cart.update({
      where: { id: cartId },
      data: {
        quantity,
        totalPrice
      }
    });
  }

  async deleteCart(cartId) {
    return prisma.cart.delete({
      where: { id: cartId }
    });
  }
}

module.exports = new CartRepository();
