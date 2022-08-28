import { IBase } from "types/IBase";
import { dynamo } from "./dynamo";
import { nanoid } from "nanoid";

export const write = async (base: IBase) => {
  const id = nanoid();

  const result = await dynamo.batchWriteItem({
    RequestItems: {
      baseTable: [
        {
          PutRequest: {
            Item: {
              // required
              id: { S: id },
              name: { S: base.name },
              mill: { S: base.mill },
              grams: { N: base.grams.toString() },
              yards: { N: base.yards.toString() },
              pricePerSkein: { N: base.pricePerSkein.toString() },
              fibers: {
                L: base.fibers.map((fiber) => ({
                  M: {
                    type: {
                      S: fiber.type,
                    },
                    percent: {
                      N: fiber.percent,
                    },
                  } as any,
                })),
              },

              // optional
              ply: { N: (base.ply ?? -1).toString() },
              notes: { S: base.notes ?? "" },
            },
          },
        },
      ],
    },
  });

  if (result.$metadata.httpStatusCode !== 200) {
    throw new Error("Could not write to table.");
  }

  return { ...base, id } as IBase & { id: string };
};
