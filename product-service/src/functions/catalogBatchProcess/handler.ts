import { SQSHandler } from "aws-lambda";
import { getSnsClient } from "../../providers/snsClient";
// import productService from "@services/productService";

const snsCreateProductTopic = process.env.createProductSnsTopic;

export const catalogBatchProcess: SQSHandler = async (event) => {
  console.log("Start processing event from SQS", event);
  try {
    const snsClient = getSnsClient();
    for (const productUploadEvent of event.Records) {
      const product = JSON.parse(productUploadEvent.body);

      // Simple validation to test Dead Letter Queue
      if (product.count < 1) {
        throw new Error(
          `Invalid product configuration ${JSON.stringify(product)}`
        );
      }

      console.log("Trying to send notification for ", product);

      // Commented since I don't have free tier right now, so disabled my RDS for right now
      // await productService.create(product);

      await snsClient
        .publish({
          Message: `Product created ${JSON.stringify(product)}`,
          TopicArn: snsCreateProductTopic,
        })
        .promise();
      console.log("Notification sent", product);
    }
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};
