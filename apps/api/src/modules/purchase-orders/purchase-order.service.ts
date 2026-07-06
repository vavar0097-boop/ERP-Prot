import { purchaseOrderRepository } from "./purchase-order.repository.js";

export const purchaseOrderService = {
  list: () => purchaseOrderRepository.findMany(),
};
