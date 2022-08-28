export type HandlerResponse<T extends Record<string, unknown>> = {
  statusCode: number;
  body: T;
};
