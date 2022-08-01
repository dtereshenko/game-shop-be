import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import productService from "@services/productService";

export const createProduct: ValidatedEventAPIGatewayProxyEvent = async (
  event
) => {
  try {
    const product = JSON.parse(event.body);
    console.log("Creating product with params", product);

    const status = await productService.create(product);

    return formatJSONResponse({
      response: { status: status ? "success" : "failed" },
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      response: {
        message: e.message,
      },
    });
  }
};
