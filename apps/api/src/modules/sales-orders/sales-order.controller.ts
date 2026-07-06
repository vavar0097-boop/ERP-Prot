import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../../utils/api-response.js";
import { salesOrderService } from "./sales-order.service.js";

export const salesOrderController = {
  list: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const salesOrders = await salesOrderService.list();
      res.json(apiResponse.success("Sales orders retrieved successfully", salesOrders));
    } catch (error) {
      next(error);
    }
  },

  create: async (_req: Request, res: Response) => {
    res.status(501).json(apiResponse.error("Create sales order is not implemented in this starter yet"));
  },
};
