import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import productService from "../../services/productService";

export const getProductById: ValidatedEventAPIGatewayProxyEvent = async (
  event
) => {
  try {
    const productId = event?.pathParameters?.productId;
    const product = await productService.findById(productId);

    return formatJSONResponse({
      response: { product },
    });
  } catch (e) {
    return formatJSONResponse({
      status: 404,
      response: { message: "Product not found" },
    });
  }
};
