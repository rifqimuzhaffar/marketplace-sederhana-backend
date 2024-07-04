const {
  findAllPurchases,
  findPurchaseById,
  insertPurchase,
  editPurchase,
  deletePurchase,
  deleteAllCartsByUserId,
  deletePurchaseItemsByPurchaseId,
} = require("./purchase.repository");

const getAllPurchases = async () => {
  const purchases = await findAllPurchases();
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
  return formattedPurchases;
};

const getPurchaseById = async (purchaseId) => {
  const purchase = await findPurchaseById(purchaseId);

  if (!purchase) {
    throw Error("Purchase Not Found");
  }

  const formattedPurchase = {
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
  };
  return formattedPurchase;
};

const createPurchase = async (userId, tableNumber, cart, status) => {
  if (!cart || cart.length === 0) {
    throw new Error("Cart is required and cannot be empty");
  }

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  const purchaseData = {
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
  };

  const purchase = await insertPurchase(purchaseData);

  await deleteAllCartsByUserId(userId);

  return purchase;
};

const patchPurchaseById = async (purchaseId, purchaseData) => {
  await getPurchaseById(purchaseId);
  const purchase = await editPurchase(purchaseId, purchaseData);
  return purchase;
};

const deletePurchaseById = async (id) => {
  await getPurchaseById(id);
  await deletePurchaseItemsByPurchaseId(id);
  await deletePurchase(id);
};

module.exports = {
  getAllPurchases,
  getPurchaseById,
  createPurchase,
  patchPurchaseById,
  deletePurchaseById,
};
