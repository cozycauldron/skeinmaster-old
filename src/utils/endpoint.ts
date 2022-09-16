import { Endpoint, HandlerResponse } from "src/types";
import z from "zod";
// import mongoose from "mongoose";

type EndpointInput<T> = {
  payload: T;
};

type EndpointFunction<R extends Record<string, unknown>, T> = (
  input: EndpointInput<T>
) => Promise<HandlerResponse<R>>;

/**
 * Decorator method of sorts to simplify the standard function
 * structure for our API endpoints. This will enforce a consistent
 * response structure, a safety net for error handling as well
 * as give us some nice utility types by providing our validation
 * schema, etc.
 */
export const endpoint = <
  R extends Record<string, any>,
  S extends z.ZodObject<R> = z.ZodObject<R>,
  P extends z.infer<S> = z.infer<S>,
  F extends EndpointFunction<R, P> = EndpointFunction<R, P>
>(
  schema: S,
  fn: F
) => {
  const method: Endpoint = async (event, context) => {
    try {
      const connectionString = process.env.MONGO_CONNECTION_STRING;
      if (!connectionString) {
        console.log("asdf", process.env);
        throw new Error(
          `Environment variable "MONGO_CONNECTION_STRING" not configured properly.`
        );
      }

      // TODO: IAM Check

      // mongoose.connect(connectionString);

      const eventBody =
        (event.requestContext as any)["http"]?.method === "GET"
          ? event.queryStringParameters
          : JSON.parse((event as any).body);

      const validPayload = await schema.parseAsync(eventBody);

      const result = await fn({
        payload: validPayload,
      } as unknown as EndpointInput<P>);

      return {
        ...result,
        body: JSON.stringify(result.body),
      };
    } catch (e) {
      if (e instanceof z.ZodError) {
        return {
          statusCode: 422,
          body: JSON.stringify({
            error: "Validation Error.",
            details: e.issues,
          }),
        };
      }
      // TODO: Better error handling, IAM errors, validation errors, etc.
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Internal Server Error.",
          details: {
            message: (e as any)?.message,
            // TODO: Restrict to dev mode
            // stack: (e as any)?.stack,
          },
        }),
      };
    } finally {
      // mongoose.disconnect();
    }
  };

  return method;
};
