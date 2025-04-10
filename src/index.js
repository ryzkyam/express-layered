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

// get product all
app.get("/products", async (req, res) => {
  const product = await prisma.product.findMany();
  res.send(product);
});

app.get("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(productId),
    },
  });
  if (!product) {
    return res.status(400).send({ message: "Product not found" });
  }
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
      categories: {
        connectOrCreate: newProductData.categories.map((category) => ({
          where: {
            id: category.id ? parseInt(category.id) : undefined,
            name: category.name,
          },
          create: { name: category.name },
        })),
      },
      tags: {
        connectOrCreate: newProductData.tags.map((tag) => ({
          where: { id: tag.id ? parseInt(tag.id) : undefined, name: tag.name },
          create: { name: tag.name },
        })),
      },
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
