const prisma = require("../../database");

const findAllProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const findProductsById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  return product;
};

const insertProduct = async (productData) => {
  const product = await prisma.product.create({
    data: {
      title: productData.title,
      price: productData.price,
      description: productData.description,
      img_url: productData.img_url,
      available: productData.available || true,
    },
  });
  return product;
};

const editProduct = async (id, productData) => {
  const product = await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title: productData.title,
      price: productData.price,
      description: productData.description,
      img_url: productData.img_url,
      available: productData.available,
    },
  });
  return product;
};

const deleteProduct = async (id) => {
  await prisma.product.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  findAllProducts,
  findProductsById,
  insertProduct,
  deleteProduct,
  editProduct,
};
