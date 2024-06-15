const { isEmail, isStrongPassword } = require("validator");
const prisma = require("../database");
const UserModel = prisma.user;

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const validateRegister = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({
      message: "Name, email, and password are required",
      data: null,
    });
  }

  if (!isEmail(email)) {
    return res.status(400).send({
      message: "Invalid email",
      data: null,
    });
  }

  if (
    !isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
  ) {
    return res.status(400).send({
      message: "Password is too weak",
      details: [
        "At least 1 uppercase letter",
        "At least 1 lowercase letter",
        "At least 1 digit",
        "Minimum length of 8 characters",
      ],
      data: null,
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(400).send({
        message: "Email already registered",
        data: null,
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      message: "Email and password are required",
      data: null,
    });
  }

  if (!isEmail(email)) {
    return res.status(400).send({
      message: "Invalid email",
      data: null,
    });
  }

  next();
};

module.exports = { validateRegister, validateLogin };
