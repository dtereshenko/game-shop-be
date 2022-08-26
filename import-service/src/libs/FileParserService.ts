import csv from "csv-parser";
import { S3 } from "aws-sdk";
import {
  BUCKET_NAME,
  PARSED_FOLDER_NAME,
  UPLOADED_FOLDER_NAME,
} from "@libs/config";
import { getS3Client } from "../providers/s3client";

class FileParserService {
  private s3Client: S3;

  constructor(client) {
    this.s3Client = client;
  }

  getObjectReadableStream(objectKey) {
    return this.s3Client
      .getObject({ Bucket: BUCKET_NAME, Key: objectKey })
      .createReadStream()
      .pipe(csv());
  }

  async moveToParsedFolder(objectKey) {
    await this.s3Client
      .copyObject({
        Bucket: BUCKET_NAME,
        Key: objectKey.replace(UPLOADED_FOLDER_NAME, PARSED_FOLDER_NAME),
        CopySource: `${BUCKET_NAME}/${objectKey}`,
      })
      .promise();

    await this.s3Client
      .deleteObject({ Bucket: BUCKET_NAME, Key: objectKey })
      .promise();
  }
}

export default new FileParserService(getS3Client());
