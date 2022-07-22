import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.getProductsList`,
  events: [
    {
      httpApi: {
        method: "get",
        path: "/products",
      },
    },
  ],
};
