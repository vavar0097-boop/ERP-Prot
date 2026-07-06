import { prisma } from "../../config/prisma.js";

export const salesOrderRepository = {
  findMany: () =>
    prisma.salesOrder.findMany({
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
};
