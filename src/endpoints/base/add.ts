import { addSchema } from "schemas";
import { endpoint } from "utils";
import * as base from "dynamo/base";

export const add = endpoint(addSchema, async ({ payload }) => {
  const result = await base.write(payload);

  return {
    statusCode: 200,
    body: {
      added: { [result.id]: result },
    },
  };
});
