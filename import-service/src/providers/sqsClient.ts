import * as AWS from "aws-sdk";
import { AWS_REGION } from "@libs/config";

const sqsClient = new AWS.SQS({
  apiVersion: "2012-11-05",
  region: AWS_REGION,
});

const importProductsQueueName = process.env.IMPORT_QUEUE_NAME;
const AWSOwnerAccountId = process.env.AWS_ACCOUNT_ID;

class QueueClient {
  private queueUrl = null;

  async getQueueUrl(): Promise<string> | never {
    if (this.queueUrl) return this.queueUrl;

    const { QueueUrl } = await sqsClient
      .getQueueUrl({
        QueueName: importProductsQueueName,
        QueueOwnerAWSAccountId: AWSOwnerAccountId,
      })
      .promise();

    this.queueUrl = QueueUrl;

    return this.queueUrl;
  }

  async sendMessage({ payload }) {
    const queueUrl = await this.getQueueUrl();

    return sqsClient
      .sendMessage({
        MessageBody: JSON.stringify(payload),
        QueueUrl: queueUrl,
      })
      .promise();
  }
}

export default new QueueClient();
