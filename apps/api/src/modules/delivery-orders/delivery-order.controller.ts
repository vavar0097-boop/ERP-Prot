import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../../utils/api-response.js";
import { deliveryOrderService } from "./delivery-order.service.js";

export const deliveryOrderController = {
  list: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const deliveryOrders = await deliveryOrderService.list();
      res.json(apiResponse.success("Delivery orders retrieved successfully", deliveryOrders));
    } catch (error) {
      next(error);
    }
  },
};
