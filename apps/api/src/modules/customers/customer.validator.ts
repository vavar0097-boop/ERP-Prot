import { z } from "zod";

export const createCustomerSchema = z.object({
  code: z.string().min(2),
  name: z.string().min(2),
  type: z.enum(["B2B", "B2C"]).default("B2C"),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  address: z.string().optional(),
  taxNumber: z.string().optional(),
  paymentTermDays: z.number().int().nonnegative().default(0),
  priceLevelId: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
