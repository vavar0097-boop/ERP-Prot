import { prisma } from "../../config/prisma.js";

export const deliveryOrderRepository = {
  findMany: () =>
    prisma.deliveryOrder.findMany({
      include: {
        customer: true,
        salesOrder: true,
        vehicle: true,
        driver: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
};
