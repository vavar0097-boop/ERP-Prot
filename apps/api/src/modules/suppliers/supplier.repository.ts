import { prisma } from "../../config/prisma.js";
import { CreateSupplierInput } from "./supplier.validator.js";

export const supplierRepository = {
  findMany: () =>
    prisma.supplier.findMany({
      orderBy: { createdAt: "desc" },
    }),

  create: (data: CreateSupplierInput) =>
    prisma.supplier.create({
      data,
    }),
};
