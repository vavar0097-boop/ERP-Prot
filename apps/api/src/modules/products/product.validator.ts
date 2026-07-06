import { ProductUnit } from "@prisma/client";
import { z } from "zod";

export const createProductSchema = z.object({
  sku: z.string().min(2),
  name: z.string().min(2),
  categoryId: z.string().optional(),
  type: z.string().min(2),
  shapeProfile: z.string().min(1),
  sizeText: z.string().min(1),
  lengthMm: z.number().int().positive().optional(),
  weightKgPerPiece: z.number().nonnegative().optional(),
  unit: z.nativeEnum(ProductUnit).default(ProductUnit.BATANG),
  minimumStock: z.number().nonnegative().default(0),
  isActive: z.boolean().default(true),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
