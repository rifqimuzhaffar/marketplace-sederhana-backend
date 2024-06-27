const CartRepository = require('./CartRepository');

class CartService {
  async addToCart(userId, productId, quantity) {
    return CartRepository.createCart(userId, productId, quantity);
  }

  async getUserCart(userId) {
    return CartRepository.getCartByUserId(userId);
  }

  async updateCartItem(cartId, quantity) {
    return CartRepository.updateCart(cartId, quantity);
  }

  async removeCartItem(cartId) {
    return CartRepository.deleteCart(cartId);
  }
}

module.exports = new CartService();

