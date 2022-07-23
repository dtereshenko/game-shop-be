import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import productService from "../../services/productService";

export const getProductById: ValidatedEventAPIGatewayProxyEvent = async (
  event
) => {
  const productId =
    event?.pathParameters?.productId || "e0e8b6a5-13f8-47f6-847e-9b22f0b16479";

  try {
    console.log("Requesting product by uuid", productId);

    const product = await productService.findById(productId);

    if (!product) {
      return formatJSONResponse({
        status: 404,
        response: { message: "Product not found" },
      });
    }

    return formatJSONResponse({
      response: { product },
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
