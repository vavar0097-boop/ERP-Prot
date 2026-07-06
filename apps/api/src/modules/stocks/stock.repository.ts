import { prisma } from "../../config/prisma.js";

export const stockRepository = {
  findMany: () =>
    prisma.stock.findMany({
      include: {
        product: {
          include: {
            category: true,
          },
        },
        location: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    }),

  findMovements: () =>
    prisma.stockMovement.findMany({
      include: {
        product: true,
        location: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 100,
    }),

  findLocations: () =>
    prisma.stockLocation.findMany({
      orderBy: {
        name: "asc",
      },
    }),
};
