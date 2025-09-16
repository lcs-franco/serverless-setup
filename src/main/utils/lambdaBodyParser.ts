import { APIGatewayProxyEventV2 } from "aws-lambda";

import { BadRequest } from "@application/errors/http/BadRequest";

export function lambdaBodyParser(body: APIGatewayProxyEventV2["body"]) {
  try {
    return body ? JSON.parse(body) : {};
  } catch {
    throw new BadRequest("Malformed body");
  }
}
