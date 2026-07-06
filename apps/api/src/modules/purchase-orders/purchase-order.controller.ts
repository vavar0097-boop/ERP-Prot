import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../../utils/api-response.js";
import { purchaseOrderService } from "./purchase-order.service.js";
import { createPurchaseOrderSchema, receivePurchaseOrderSchema } from "./purchase-order.validator.js";

export const purchaseOrderController = {
  list: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const purchaseOrders = await purchaseOrderService.list();
      res.json(apiResponse.success("Purchase orders retrieved successfully", purchaseOrders));
    } catch (error) {
      next(error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = createPurchaseOrderSchema.parse(req.body);
      const purchaseOrder = await purchaseOrderService.create(payload);
      res.status(201).json(apiResponse.success("Purchase order created successfully", purchaseOrder));
    } catch (error) {
      next(error);
    }
  },

  receive: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = receivePurchaseOrderSchema.parse(req.body);
      const receipt = await purchaseOrderService.receive(req.params.id, payload);
      res.status(201).json(apiResponse.success("Goods receipt created successfully", receipt));
    } catch (error) {
      next(error);
    }
  },
};
