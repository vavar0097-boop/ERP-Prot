import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../../utils/api-response.js";
import { invoiceService } from "./invoice.service.js";

export const invoiceController = {
  list: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const invoices = await invoiceService.list();
      res.json(apiResponse.success("Invoices retrieved successfully", invoices));
    } catch (error) {
      next(error);
    }
  },
};
