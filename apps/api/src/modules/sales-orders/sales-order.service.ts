import { salesOrderRepository } from "./sales-order.repository.js";

export const salesOrderService = {
  list: () => salesOrderRepository.findMany(),
};
