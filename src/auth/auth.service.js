const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("./auth.repository");

const registerUser = async (username, email, password, role) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const userData = {
    username,
    email,
    password: passwordHash,
    role: role || "regular",
  };
  return createUser(userData);
};

const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email / password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email / password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET
  );

  return { token };
};

module.exports = {
  registerUser,
  loginUser,
};
