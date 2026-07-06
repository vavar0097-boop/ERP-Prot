import { z } from "zod";

export const createSupplierSchema = z.object({
  code: z.string().min(2),
  name: z.string().min(2),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  address: z.string().optional(),
  contactPerson: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type CreateSupplierInput = z.infer<typeof createSupplierSchema>;
