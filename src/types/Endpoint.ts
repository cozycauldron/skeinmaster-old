import { Context, APIGatewayEvent } from "aws-lambda";
import { EndpointResponse } from "./EndpointResponse";

export type Endpoint = (
  event: APIGatewayEvent,
  context: Context
) => Promise<EndpointResponse>;
