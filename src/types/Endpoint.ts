import { Context, APIGatewayEvent } from "aws-lambda";

export type EndpointResponse = {
  statusCode: number;
  body: string;
};

export type Endpoint = (
  event: APIGatewayEvent,
  context: Context
) => Promise<EndpointResponse>;
