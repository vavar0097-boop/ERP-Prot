import { invoiceRepository } from "./invoice.repository.js";

export const invoiceService = {
  list: () => invoiceRepository.findMany(),
};
