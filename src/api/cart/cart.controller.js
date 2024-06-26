const prisma = require('../prisma');

// Menambahkan item ke keranjang
exports.addItemToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const cart = await prisma.cart.upsert({
      where: { userId: userId },
      create: { userId: userId },
      update: {},
    });

    const cartItem = await prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId: productId } },
      create: {
        cartId: cart.id,
        productId: productId,
        quantity: quantity,
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
    });

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Melihat keranjang
exports.viewCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: parseInt(userId) },
      include: { items: true },
    });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Memperbarui item dalam keranjang
exports.updateCartItem = async (req, res) => {
  const { cartItemId, quantity } = req.body;

  try {
    const cartItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: quantity },
    });

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Menghapus item dari keranjang
exports.removeCartItem = async (req, res) => {
  const { cartItemId } = req.body;

  try {
    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};