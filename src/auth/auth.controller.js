const express = require("express");
const { registerUser, loginUser } = require("./auth.service");

const router = express.Router();
const { validateRegister, validateLogin } = require("../middlewares/validator");

router.post("/register", validateRegister, async (req, res, next) => {
  const { username, email, password, role } = req.body;

  try {
    await registerUser(username, email, password, role);
    res.status(201).send({
      message: "User successfully registered",
      data: null,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login", validateLogin, async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await loginUser(email, password);
    res.send({
      message: "User successfully logged in",
      data: result,
    });
  } catch (err) {
    res.status(401).send({
      message: err.message,
      data: null,
    });
  }
});

module.exports = router;
