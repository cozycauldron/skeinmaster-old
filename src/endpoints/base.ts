import { addSchema } from "schemas";
import { endpoint } from "utils";
import { Base } from "models/Base";
import { getSchema } from "schemas/base/getSchema";

export const add = endpoint(addSchema, async ({ payload }) => {
  const base = await Base.create(payload);

  return {
    statusCode: 200,
    body: { base },
  };
});

export const get = endpoint(getSchema, async ({ payload }) => {
  const base = await Base.get(payload.id);

  return {
    statusCode: 200,
    body: { base },
  };
});
