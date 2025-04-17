const prisma = require("../db");
const { product } = require("../db");

const getAllProducts = async () => {
  const products = await prisma.product.findMany({
    include: {
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
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
    include: {
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
git 
  if (!product) {
    throw new Error("Product not found!");
  }
  return product;
};

const createProduct = async (ProductData) => {
  console.log(ProductData);

  const product = await prisma.product.create({
    data: {
      name: ProductData.name,
      description: ProductData.description,
      price: ProductData.price,
      image: ProductData.image,
      categories: {
        connectOrCreate: ProductData.categories.map((category) => ({
          where: {
            id: category.id ? parseInt(category.id) : undefined,
            name: category.name,
          },
          create: { name: category.name },
        })),
      },
      tags: {
        connectOrCreate: ProductData.tags.map((tag) => ({
          where: { id: tag.id ? parseInt(tag.id) : undefined, name: tag.name },
          create: { name: tag.name },
        })),
      },
    },
  });
  return product;
};

const deleteProduct = async (productId) => {
  const product = await prisma.product.delete({
    where: {
      id: parseInt(productId),
    },
  });

  return product;
};
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
};
