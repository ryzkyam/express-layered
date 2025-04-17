// untuk menkontrol alur bussines dari applikasi
const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
} = require("./product.service");
const { product } = require("../db");

// get product all
router.get("/", async (req, res) => {
  const product = await getAllProducts();
  res.send(product);
});

router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductById(productId);
   
    res.status(201).send({
      data: product,
    });
  } catch (error) {
    res.status(400).send(error.massage);
  }
  return product
});

// create product
router.post("/", async (req, res) => {
  const ProductData = req.body;
  const product = await createProduct(ProductData);
  res.status(201).send({
    data: product,
    massage: "create product succes",
  });
});

// delete product
router.delete("/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  const product = await deleteProduct(productId);
  res.send({
    data: product,
    massage: "deleted product succes",
  });
});

module.exports = router;
