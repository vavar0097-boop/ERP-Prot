import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../../utils/api-response.js";
import { authService } from "./auth.service.js";
import { loginSchema } from "./auth.validator.js";

export const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = loginSchema.parse(req.body);
      res.json(apiResponse.success("Login berhasil", authService.login(payload)));
    } catch (error) {
      next(error);
    }
  },

  me: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.replace(/^Bearer\s+/i, "");
      res.json(apiResponse.success("User retrieved successfully", authService.verify(token)));
    } catch (error) {
      next(error);
    }
  },
};
