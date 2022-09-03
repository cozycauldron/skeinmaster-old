import * as dynamoose from "dynamoose";
import { Item } from "dynamoose/dist/Item";
import { nanoid } from "nanoid";
import { IBase } from "types/IBase";

type BaseEntity = Item & IBase;

export const Base = dynamoose.model<BaseEntity>("Base", {
  name: String,
  mill: String,
  pricePerSkein: Number,
  yards: Number,
  fibers: Array,
  ply: Number,

  id: {
    type: String,
    default: () => `base:${nanoid()}`,
    hashKey: true,
  },
  grams: {
    type: Number,
    default: () => 100,
  },
  notes: {
    type: String,
    default: () => "",
  },
});
