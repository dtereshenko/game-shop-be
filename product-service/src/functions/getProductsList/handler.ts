import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import productService from "../../services/productService";
import { Client } from "pg";

const dbOption = {
  user: process.env.DB_USER || "postgres",
  host:
    process.env.DB_HOST ||
    "product-service.c6dsfu9l1eca.eu-west-1.rds.amazonaws.com",
  database: process.env.DB_NAME || "products",
  password: process.env.DB_PASSWORD || "TyKrtxOezUqnWUjKvBxV",
  port: +process.env.DB_PORT || 5432,
  debug: true,
  delayMs: 3000,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

const dbClient = new Client(dbOption);

export const getProductsList: ValidatedEventAPIGatewayProxyEvent = async () => {
  try {
    await dbClient.connect();
    const now = await dbClient.query("SELECT NOW() as now");

    console.log("now response", now);
    const games = await productService.getAll();

    await dbClient.end();
    return formatJSONResponse({
      response: { products: games, now },
    });
  } catch (e) {
    console.error("error message:", e.message);
    await dbClient.end();
    return formatJSONResponse({ status: 500, response: { message: e } });
  }
};
