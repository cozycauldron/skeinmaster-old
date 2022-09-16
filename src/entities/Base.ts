// import { Schema, model } from "mongoose";
// import { Fiber } from "src/types/enums";

// export interface IBase {
//   name: string;
//   millId: string;
//   pricePerSkein: number;
//   yards: number;
//   grams: number;
//   fibers: Array<{ type: Fiber; percent: number }>;
//   ply?: number;
//   notes?: string;
// }

// const baseSchema = new Schema<IBase>({
//   name: { type: String, required: true },
//   millId: { type: String, required: true },
//   yards: { type: Number, required: true },
//   ply: { type: Number, required: true },
//   pricePerSkein: { type: Number, required: true },
//   fibers: Array,

//   grams: { type: Number, default: () => 100 },
//   notes: { type: String, default: () => "" },
// });

// export const Base = model<IBase>("Base", baseSchema);

// export default Base;
