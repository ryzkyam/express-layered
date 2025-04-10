const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();
dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("selamat datang");
  prisma.product;
});

// get
app.get("/products", async (req, res) => {
  const product = await prisma.product.findMany();
  res.send(product);
});


// create product
app.post("/products", async (req, res) => {
  const newProductData = req.body;
  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      description: newProductData.description,
      price: newProductData.price,
      image: newProductData.image,
    },
  });
  res.status(201).send({
    data: product,
    massage: "create product succes",
  });
});


// delete product
app.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;
  await prisma.product.delete({
    where: {
      id: parseInt(productId),
    },
  });

  res.send("product deleted");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ` + PORT);
});
