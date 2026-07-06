import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../../utils/api-response.js";
import { purchaseOrderService } from "./purchase-order.service.js";

export const purchaseOrderController = {
  list: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const purchaseOrders = await purchaseOrderService.list();
      res.json(apiResponse.success("Purchase orders retrieved successfully", purchaseOrders));
    } catch (error) {
      next(error);
    }
  },

  create: async (_req: Request, res: Response) => {
    res.status(501).json(apiResponse.error("Create purchase order is not implemented in this starter yet"));
  },
};
