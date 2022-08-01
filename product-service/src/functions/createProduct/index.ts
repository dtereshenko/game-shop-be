import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.createProduct`,
  events: [
    {
      httpApi: {
        method: "post",
        path: "/products",
      },
    },
  ],
};
