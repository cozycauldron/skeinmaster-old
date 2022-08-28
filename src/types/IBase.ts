import { Fiber } from "enums";

export interface IBase {
  name: string;
  mill: string;
  pricePerSkein: number;
  yards: number;
  grams: number;
  fibers: Array<{ type: Fiber; percent: number }>;
  ply?: number;
  notes?: string;

  // This will be defined if the base exists in dynamo already
  id?: string;
}
