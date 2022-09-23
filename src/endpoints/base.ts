import { endpoint } from "src/utils/endpoint";
import { addSchema, findSchema, getSchema } from "src/schemas/baseSchemas";
import { prisma } from "src/prisma";

export const add = endpoint(addSchema, async ({ payload }) => {
  // const mill = await prisma.mill.findFirst({ where: { id: payload.millId } });

  // if (!mill) {
  //   throw new Error(`Mill with the id of "${payload.millId}" was not found.`);
  // }

  const base = await prisma.yarnBase.create({
    data: {
      name: payload.name,
      ply: payload.ply,
      yards: payload.yards,
      mill: { connect: { id: payload.millId } },
    },
  });

  return {
    statusCode: 200,
    body: { base },
  };
});

export const get = endpoint(getSchema, async ({ payload }) => {
  const base = await prisma.yarnBase.findFirstOrThrow({
    where: {
      id: {
        equals: payload.id,
      },
    },
  });

  return {
    statusCode: 200,
    body: { base },
  };
});

export const find = endpoint(findSchema, async () => {
  return {
    statusCode: 200,
    body: {
      page: 1,
      result: [],
    },
  };
});
