const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.get("/api/auth/register", (req, res) => {
  res.send("hallo");
});

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log("Server Running in Port = " + PORT);
});
