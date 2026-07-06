import express, { Express } from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { healthRoutes } from "./modules/health/health.route.js";
import { authRoutes } from "./modules/auth/auth.route.js";
import { productRoutes } from "./modules/products/product.route.js";
import { supplierRoutes } from "./modules/suppliers/supplier.route.js";
import { customerRoutes } from "./modules/customers/customer.route.js";
import { stockRoutes } from "./modules/stocks/stock.route.js";
import { purchaseOrderRoutes } from "./modules/purchase-orders/purchase-order.route.js";
import { salesOrderRoutes } from "./modules/sales-orders/sales-order.route.js";
import { invoiceRoutes } from "./modules/invoices/invoice.route.js";
import { deliveryOrderRoutes } from "./modules/delivery-orders/delivery-order.route.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { notFoundMiddleware } from "./middleware/not-found.middleware.js";

export const createApp = (): Express => {
  const app = express();

  const normalizeOrigin = (origin: string) => origin.replace(/\/$/, "");

  const developmentOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8888",
    "http://127.0.0.1:8888",
  ];
  const allowedOrigins =
    env.NODE_ENV === "development"
      ? [...developmentOrigins, env.FRONTEND_URL, ...(env.FRONTEND_URLS?.split(",") ?? [])].map(normalizeOrigin)
      : [env.FRONTEND_URL, ...(env.FRONTEND_URLS?.split(",") ?? [])].map(normalizeOrigin);

  const corsOptions = {
    origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
      if (!origin || allowedOrigins.includes(normalizeOrigin(origin))) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };
  app.use(cors(corsOptions));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/health", healthRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/suppliers", supplierRoutes);
  app.use("/api/customers", customerRoutes);
  app.use("/api/stocks", stockRoutes);
  app.use("/api/purchase-orders", purchaseOrderRoutes);
  app.use("/api/sales-orders", salesOrderRoutes);
  app.use("/api/invoices", invoiceRoutes);
  app.use("/api/delivery-orders", deliveryOrderRoutes);

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
};
