import { Fibers } from "enums";
import { z } from "zod";

export const getSchema = z.object({
  id: z.string(),
});
