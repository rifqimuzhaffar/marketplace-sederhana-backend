const prisma = require("../../database");
const {
  findAllProducts,
  findProductsById,
  insertProduct,
  deleteProduct,
  editProduct,
} = require("./product.repository");

const getAllProducts = async () => {
  const products = await findAllProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await findProductsById(id);

  if (!product) {
    throw Error("Product Not Found");
  }
  return product;
};

const createProduct = async (newProductsData) => {
  const product = await insertProduct(newProductsData);

  return product;
};

const patchProductById = async (id, productData) => {
  await getProductById(id);

  const product = await editProduct(id, productData);
  return product;
};

const deleteProductById = async (id) => {
  await getProductById(id);
  await deleteProduct(id);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  patchProductById,
  deleteProductById,
};
