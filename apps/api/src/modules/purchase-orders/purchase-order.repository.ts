import { prisma } from "../../config/prisma.js";

export const purchaseOrderRepository = {
  findMany: () =>
    prisma.purchaseOrder.findMany({
      include: {
        supplier: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
};
