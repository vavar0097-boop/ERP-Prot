import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../../utils/api-response.js";
import { stockService } from "./stock.service.js";

export const stockController = {
  list: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const stocks = await stockService.list();
      res.json(apiResponse.success("Stocks retrieved successfully", stocks));
    } catch (error) {
      next(error);
    }
  },

  movements: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const movements = await stockService.movements();
      res.json(apiResponse.success("Stock movements retrieved successfully", movements));
    } catch (error) {
      next(error);
    }
  },
};
