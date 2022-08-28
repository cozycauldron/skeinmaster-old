import { endpoint } from "utils";
import { Fiber } from "enums";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  mill: z.string().min(1),
  pricePerSkein: z.number().min(1),
  yards: z.number().min(50),
  grams: z.number().min(25),
  ply: z.number().min(0).max(10).optional(),
  notes: z.string().optional(),
  fibers: z
    .object({
      type: z.nativeEnum(Fiber),
      percent: z.number().max(100),
    })
    .array()
    .min(1)
    .max(5),
});

export const add = endpoint(schema, async ({ payload }) => {
  console.log("----------------------------");
  console.log(payload);
  console.log("----------------------------");

  return {
    statusCode: 200,
    body: {
      foo: "bar",
    },
  };
});
