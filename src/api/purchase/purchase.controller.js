const express = require("express");
const router = express.Router();
const {
  getAllPurchases,
  getPurchaseById,
  createPurchase,
  patchPurchaseById,
  deletePurchaseById,
} = require("./purchase.service");
const { verifyToken } = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");

router.get("/", verifyToken, async (req, res, next) => {
  try {
    const purchases = await getAllPurchases();
    res.status(200).send({
      message: "success",
      data: purchases,
    });
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch purchase data" });
  }
});

router.get("/:id", verifyToken, async (req, res, next) => {
  try {
    const purchaseId = parseInt(req.params.id);

    if (isNaN(purchaseId)) {
      return res.status(400).send("ID is not a number");
    }

    const purchase = await getPurchaseById(purchaseId);
    res.status(200).send(purchase);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", verifyToken, async (req, res, next) => {
  const { userId, tableNumber, cart, status } = req.body;
  try {
    const purchase = await createPurchase(userId, tableNumber, cart, status);
    res.status(201).send({
      message: "Success Add Purchase",
      data: purchase,
    });
  } catch (error) {
    if (error.message === "Cart is required and cannot be empty") {
      res.status(400).send({ error: error.message });
    } else {
      res.status(500).send({ error: "Failed to create purchase" });
    }
  }
});

router.patch("/:id", verifyToken, isAdmin, async (req, res, next) => {
  const purchaseId = parseInt(req.params.id);
  const purchaseData = req.body;

  try {
    if (isNaN(purchaseId)) {
      return res.status(400).send("ID is not a number");
    }

    const purchase = await patchPurchaseById(purchaseId, purchaseData);
    res.send({
      message: "Update Purchase Success",
      data: purchase,
    });
  } catch (error) {
    if (error.message === "Purchase Not Found") {
      res.status(404).send({ error: error.message });
    } else {
      console.log(error);
      res.status(500).send({ error: "Failed to update purchase" });
    }
  }
});

router.delete("/:id", verifyToken, isAdmin, async (req, res, next) => {
  const { id } = req.params;
  try {
    if (isNaN(id)) {
      return res.status(400).send("ID is not a number");
    }

    await deletePurchaseById(id);
    res.status(200).send({ message: "Purchase deleted successfully" });
  } catch (error) {
    if (error.message === "Purchase Not Found") {
      res.status(404).send({ error: error.message });
    } else {
      console.log(error);
      res.status(500).send({ error: "Failed to delete purchase data" });
    }
  }
});

module.exports = router;
