const express = require("express");
const router = express.Router();
const {
  getCartsByUserId,
  addProductToCart,
  patchCartById,
  deleteCartById,
} = require("./cart.service");
const { verifyToken } = require("../../middlewares/auth");

router.get("/:userId", verifyToken, async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (isNaN(userId)) {
      return res.status(400).send("ID is not a number");
    }

    const userCarts = await getCartsByUserId(userId);

    res.status(200).send(userCarts);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", verifyToken, async (req, res, next) => {
  const { userId, productId, quantity } = req.body;

  try {
    const userCart = await addProductToCart(userId, productId, quantity);

    res.status(200).send({
      message: "Success Add Product to Cart",
      data: userCart,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/:id", verifyToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (isNaN(id)) {
      return res.status(400).send("ID is not a number");
    }

    const updatedCart = await patchCartById(id, quantity);

    res.status(200).send(updatedCart);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).send("ID is not a number");
    }

    await deleteCartById(id);

    res.status(200).send({ message: "Item removed from cart" });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
