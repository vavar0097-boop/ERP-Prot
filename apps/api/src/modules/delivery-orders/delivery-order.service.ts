import { deliveryOrderRepository } from "./delivery-order.repository.js";

export const deliveryOrderService = {
  list: () => deliveryOrderRepository.findMany(),
};
