import { prisma } from "../../config/prisma.js";
import { CreateProductInput } from "./product.validator.js";

export const productRepository = {
  findMany: () =>
    prisma.product.findMany({
      include: {
        category: true,
        stocks: {
          include: {
            location: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),

  create: (data: CreateProductInput) =>
    prisma.product.create({
      data,
      include: {
        category: true,
      },
    }),
};
