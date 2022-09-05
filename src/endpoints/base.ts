import { endpoint } from "src/utils/endpoint";
import { addSchema, getSchema } from "src/schemas/baseSchemas";
import Base from "src/entities/Base";

export const add = endpoint(addSchema, async ({ payload }) => {
  const base = await (await Base.create(payload)).save();

  return {
    statusCode: 200,
    body: { base },
  };
});

export const get = endpoint(getSchema, async ({ payload }) => {
  const query = Base.findOne({ _id: payload.id });
  const base = await query.exec();

  return {
    statusCode: 200,
    body: { base },
  };
});
