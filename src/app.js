const express = require("express");
const app= express();

const dotenv = require("dotenv");
dotenv.config();

const { cors } = require("./middlewares/app");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors);

if (!process.env.JWT_SECRET) {
  console.error(
    "JWT_SECRET is not provided, fill it with random string or generate it using 'openssl rand -base64 32'"
  );
  process.exit(1);
}

const authController = require("./api/auth/auth.controller");
const productsController = require("./api/product/product.controller");

app.use("/auth", authController);
app.use("/products", productsController);

const express = require('express');
const cartRoutes = require('./routes/cartRoutes');

app.use(express.json());
app.use('/cart', cartRoutes);

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log("Server Running in Port = " + PORT);
});