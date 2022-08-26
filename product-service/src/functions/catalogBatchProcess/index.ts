import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.catalogBatchProcess`,
  environment: {
    createProductSnsTopic: { Ref: "CreateProductTopic" },
  },
  events: [
    {
      sqs: {
        arn: { "Fn::GetAtt": ["CatalogItemsQueue", "Arn"] },
        batchSize: 5,
      },
    },
  ],
};
