import { supplierRepository } from "./supplier.repository.js";
import { CreateSupplierInput } from "./supplier.validator.js";

export const supplierService = {
  list: () => supplierRepository.findMany(),
  create: (input: CreateSupplierInput) => supplierRepository.create(input),
};
