import { purchaseOrderRepository } from "./purchase-order.repository.js";
import { CreatePurchaseOrderInput, ReceivePurchaseOrderInput } from "./purchase-order.validator.js";

export const purchaseOrderService = {
  list: () => purchaseOrderRepository.findMany(),
  create: (input: CreatePurchaseOrderInput) => purchaseOrderRepository.create(input),
  receive: (id: string, input: ReceivePurchaseOrderInput) => purchaseOrderRepository.receive(id, input),
};
