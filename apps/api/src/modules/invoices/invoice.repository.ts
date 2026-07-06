import { prisma } from "../../config/prisma.js";

export const invoiceRepository = {
  findMany: () =>
    prisma.invoice.findMany({
      include: {
        customer: true,
        salesOrder: true,
        items: true,
      },
      orderBy: { createdAt: "desc" },
    }),
};
