const express = require("express");
const router = express.Router();
const prisma = require("../../database");

router.get("/", async (req, res, next) => {
  try {
    const purchases = await prisma.purchase.findMany({
      select: {
        id: true,
        userId: true,
        tableNumber: true,
        createdAt: true,
        totalPrice: true,
        status: true,
        purchaseItems: {
          select: {
            product: {
              select: {
                id: true,
                title: true,
                price: true,
              },
            },
            quantity: true,
            total: true,
          },
        },
      },
    });

    const formattedPurchases = purchases.map((purchase) => ({
      purchaseId: purchase.id,
      userId: purchase.userId,
      tableNumber: purchase.tableNumber,
      createdAt: purchase.createdAt,
      totalPrice: purchase.totalPrice,
      status: purchase.status,
      cart: purchase.purchaseItems.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        quantity: item.quantity,
        total: item.total,
      })),
    }));

    res.status(200).json(formattedPurchases);
  } catch (error) {
    console.error("Error fetching purchase data:", error);
    res.status(500).json({ error: "Failed to fetch purchase data" });
  }
});

router.post("/", async (req, res, next) => {
  const { userId, tableNumber, cart, status } = req.body;
  if (!cart || cart.length === 0) {
    return res.status(400).send({
      error: "Cart is required and cannot be empty",
    });
  }

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  try {
    const purchase = await prisma.purchase.create({
      data: {
        userId: parseInt(userId, 10),
        tableNumber: tableNumber,
        totalPrice: parseFloat(totalPrice),
        status: status || "Requested",
        purchaseItems: {
          create: cart.map((item) => ({
            quantity: item.quantity,
            total: item.quantity * item.product.price,
            productId: item.product.id,
          })),
        },
      },
    });

    await prisma.cart.deleteMany({
      where: {
        userId: parseInt(userId, 10),
      },
    });

    res.status(201).send(purchase);
  } catch (error) {
    res.status(500).send({ error: "Failed to create purchase" });
  }
});

router.patch("/:id", async (req, res, next) => {
  const purchaseId = parseInt(req.params.id);
  const purchaseData = req.body;

  if (isNaN(purchaseId)) {
    return res.status(400).send("ID is not a number");
  }

  const purchase = await prisma.purchase.update({
    where: {
      id: purchaseId,
    },
    data: {
      userId: purchaseData.userId,
      tableNumber: purchaseData.tableNumber,
      totalPrice: purchaseData.totalPrice,
      status: purchaseData.status,
    },
  });
  res.send({
    message: "Update Product Success",
    data: purchase,
  });
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.purchaseItem.deleteMany({
      where: { purchaseId: parseInt(id, 10) },
    });

    await prisma.purchase.delete({
      where: { id: parseInt(id, 10) },
    });

    res.status(200).json({ message: "Purchase deleted successfully" });
  } catch (error) {
    console.error("Error deleting purchase data:", error);
    res.status(500).json({ error: "Failed to delete purchase data" });
  }
});

module.exports = router;
