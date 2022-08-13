import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";

export type APIGatewayHandler = Handler<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
>;

export const formatJSONResponse = ({
  status,
  response,
}: {
  status?: 200 | 400 | 404 | 500;
  response: Record<string, unknown>;
}) => {
  return {
    statusCode: status || 200,
    body: JSON.stringify(response),
  };
};
