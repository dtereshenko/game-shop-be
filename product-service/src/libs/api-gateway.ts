import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";

export type ValidatedEventAPIGatewayProxyEvent = Handler<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
>;

export const formatJSONResponse = ({
  status,
  response,
}: {
  status?: 200 | 404 | 500;
  response: Record<string, unknown>;
}) => {
  return {
    statusCode: status || 200,
    body: JSON.stringify(response),
  };
};
