const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("selamat datang");
  prisma.product;
});

const productController = require("./product/product.controller");

app.use("/products", productController);

app.listen(PORT, () => {
  console.log(`Server is running on port ` + PORT);
});
