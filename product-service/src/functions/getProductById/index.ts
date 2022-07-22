import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.getProductById`,
  events: [
    {
      httpApi: {
        method: "get",
        path: "/products/{productId}",
      },
    },
  ],
};
