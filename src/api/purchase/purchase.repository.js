const prisma = require("../../database");

const findAllPurchases = async () => {
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
  return purchases;
};

const findPurchaseById = async (purchaseId) => {
  const purchase = await prisma.purchase.findUnique({
    where: {
      id: parseInt(purchaseId, 10),
    },
    include: {
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

  return purchase;
};

const insertPurchase = async (purchaseData) => {
  return await prisma.purchase.create({
    data: purchaseData,
  });
};

const deleteAllCartsByUserId = async (userId) => {
  await prisma.cart.deleteMany({
    where: {
      userId: parseInt(userId, 10),
    },
  });
};

const editPurchase = async (purchaseId, purchaseData) => {
  const purchase = await prisma.purchase.update({
    where: {
      id: parseInt(purchaseId, 10),
    },
    data: {
      userId: purchaseData.userId,
      tableNumber: purchaseData.tableNumber,
      totalPrice: purchaseData.totalPrice,
      status: purchaseData.status,
    },
  });
  return purchase;
};

const deletePurchaseItemsByPurchaseId = async (id) => {
  await prisma.purchaseItem.deleteMany({
    where: {
      purchaseId: parseInt(id, 10),
    },
  });
};

const deletePurchase = async (id) => {
  await prisma.purchase.delete({
    where: {
      id: parseInt(id, 10),
    },
  });
};

module.exports = {
  findAllPurchases,
  findPurchaseById,
  insertPurchase,
  deleteAllCartsByUserId,
  editPurchase,
  deletePurchaseItemsByPurchaseId,
  deletePurchase,
};
