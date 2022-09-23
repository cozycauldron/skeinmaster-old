import { Fibers } from "src/types/enums";
import { z } from "zod";

export const addSchema = z.object({
  name: z.string().min(1),
  millId: z.string().min(1),
  pricePerSkein: z.number().min(1),
  yards: z.number().min(50),
  grams: z.number().min(25).optional().default(100),
  ply: z.number().min(0).max(10),
  notes: z.string().optional(),
  fibers: z
    .object({
      type: z.nativeEnum(Fibers),
      percent: z.number().max(100),
    })
    .array()
    .min(1)
    .max(5),
});

export const getSchema = z.object({
  id: z.string(),
});

export const findSchema = z.object({
  name: z.string(),
  millId: z.string().min(1),
  pricePerSkein: z.number().min(1),
  yards: z.number().min(50),
  grams: z.number().min(25),
  ply: z.number().min(0).max(10).optional(),
  notes: z.string().optional(),
  fibers: z
    .object({
      type: z.nativeEnum(Fibers),
      percent: z.number().max(100),
    })
    .array()
    .min(1)
    .max(5),
});
