const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  patchProductById,
} = require("./product.service");
const { verifyToken, isAdmin } = require("../../middlewares/auth");
const { upload, deleteImage } = require("../../middlewares/upload");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const products = await getAllProducts();
  res.send({
    message: "success",
    data: products,
  });
});

router.get("/:id", async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);

    if (isNaN(productId)) {
      return res.status(400).send("ID is not a number");
    }

    const product = await getProductById(productId);
    res.send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("image"),
  async (req, res, next) => {
    try {
      const { title, price, description, available } = req.body;
      const imageUrl = req.file ? req.file.path : "";
      const newProductsData = {
        title,
        price: parseFloat(price),
        description,
        img_url: imageUrl,
        available,
      };

      const product = await createProduct(newProductsData);
      res.status(201).send({
        message: "Success Add Products",
        data: product,
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

router.patch(
  "/:id",
  verifyToken,
  isAdmin,
  upload.single("image"),
  async (req, res, next) => {
    try {
      const productId = parseInt(req.params.id);

      if (isNaN(productId)) {
        return res.status(400).send("ID is not a number");
      }

      const currentProduct = await getProductById(productId);
      if (!currentProduct) {
        return res.status(404).send("Product not found");
      }

      let productData = req.body;

      if (req.file) {
        const oldImageUrl = currentProduct.img_url;
        if (oldImageUrl) {
          await deleteImage(oldImageUrl);
        }
        productData.img_url = req.file.path;
      }

      const product = await patchProductById(productId, productData);
      res.send({
        message: "Update Product Success",
        data: product,
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

router.delete("/:id", verifyToken, isAdmin, async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);

    if (isNaN(productId)) {
      return res.status(400).send("ID is not a number");
    }

    await deleteProductById(productId);

    res.send({
      message: "Delete Product Success",
      data: [],
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
