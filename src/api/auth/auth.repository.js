const prisma = require("../../database");

const createUser = async (userData) => {
  return prisma.user.create({
    data: userData,
  });
};

const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

module.exports = {
  createUser,
  findUserByEmail,
};
