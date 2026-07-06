import { prisma } from "../../config/prisma.js";
import { CreateCustomerInput } from "./customer.validator.js";

export const customerRepository = {
  findMany: () =>
    prisma.customer.findMany({
      include: {
        priceLevel: true,
      },
      orderBy: { createdAt: "desc" },
    }),

  create: (data: CreateCustomerInput) =>
    prisma.customer.create({
      data,
      include: {
        priceLevel: true,
      },
    }),
};
