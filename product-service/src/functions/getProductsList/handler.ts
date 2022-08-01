import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import productService from "../../services/productService";

export const getProductsList: ValidatedEventAPIGatewayProxyEvent = async () => {
  try {
    const games = await productService.getAll();

    return formatJSONResponse({
      response: { products: games },
    });
  } catch (e) {
    console.error("error message:", e.message);
    return formatJSONResponse({ status: 500, response: { message: e } });
  }
};
