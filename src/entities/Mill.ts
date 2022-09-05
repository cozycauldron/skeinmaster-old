import { Schema, model } from "mongoose";

interface IMill {
  name: string;
}

const userSchema = new Schema<IMill>({
  name: { type: String, required: true },
});

export const Mill = model<IMill>("Mill", userSchema);

export default Mill;
