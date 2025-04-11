const prisma = require("../db");
const { product } = require("../db");

const getAllProducts = async () => {
  const products = await prisma.product.findMany();

  return products;
};

const getProductById = async (id) => {
  if (typeof id !== "number") {
    throw new Error("ID is not number");
  }

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    throw new Error("Product not found!");
  }
  return product;
};
module.exports = {
  getAllProducts,
  getProductById,
};
