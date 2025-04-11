const express = require("express");
const router = express.Router();

const prisma = require("../db");
const { getAllProducts, getProductById } = require("./product.service");

// get product all
router.get("/", async (req, res) => {
  const product = await getAllProducts();
  res.send(product);
});

router.get("/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  const product = await getProductById(productId);

  res.send(product);
});

// create product
router.post("/", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  await prisma.product.delete({
    where: {
      id: parseInt(productId),
    },
  });

  res.send("product deleted");
});

module.exports = router;
