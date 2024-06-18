const express = require("express");
const prisma = require("../database");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const products = await prisma.product.findMany();
  res.send({
    message: "success",
    data: products,
  });
});

router.get("/:id", async (req, res, next) => {
  const productId = req.params.id;
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(productId),
    },
  });

  if (!product) {
    return res.status(400).send({
      message: "Product not found",
      data: [],
    });
  }

  res.send({
    message: "Success",
    data: product,
  });
});

router.post("/", async (req, res, next) => {
  const newProductsData = req.body;

  const product = await prisma.product.create({
    data: {
      title: newProductsData.title,
      price: newProductsData.price,
      description: newProductsData.description,
      img_url: newProductsData.img_url,
      available: newProductsData.available,
    },
  });

  res.status(201).send({
    message: "Success Add Products",
    data: [],
  });
});

router.patch("/:id", async (req, res, next) => {
  const productId = req.params.id;
  const productData = req.body;

  const product = await prisma.product.update({
    where: {
      id: parseInt(productId),
    },
    data: {
      title: productData.title,
      price: productData.price,
      description: productData.description,
      img_url: productData.img_url,
      available: productData.available,
    },
  });
  res.send({
    message: "Update Product Success",
    data: product,
  });
});

router.delete("/:id", async (req, res, next) => {
  const productId = req.params.id;

  await prisma.product.delete({
    where: {
      id: parseInt(productId),
    },
  });

  res.send({
    message: "Delete Product Success",
    data: [],
  });
});

module.exports = router;
