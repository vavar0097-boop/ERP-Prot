import { z } from "zod";

export const createPurchaseOrderSchema = z.object({
  supplierId: z.string().min(1),
  poNumber: z.string().min(2).optional(),
  expectedDate: z.string().datetime().optional(),
  items: z.array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().positive(),
      unitPrice: z.number().nonnegative(),
    })
  ).min(1),
});

export const receivePurchaseOrderSchema = z.object({
  receiptNumber: z.string().min(2).optional(),
  locationId: z.string().min(1),
  remarks: z.string().optional(),
  items: z.array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().positive(),
    })
  ).min(1),
});

export type CreatePurchaseOrderInput = z.infer<typeof createPurchaseOrderSchema>;
export type ReceivePurchaseOrderInput = z.infer<typeof receivePurchaseOrderSchema>;
