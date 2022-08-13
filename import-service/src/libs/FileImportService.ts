import { S3 } from "aws-sdk";
import { BUCKET_NAME, UPLOADED_FOLDER_NAME } from "@libs/config";
import { getS3Client } from "@libs/s3client";

const getBucketParams = (fileName) => ({
  Bucket: BUCKET_NAME,
  Key: `${UPLOADED_FOLDER_NAME}/${fileName}`,
  Expires: 60,
  ContentType: "text/csv",
});

class FileImportService {
  private client: S3;

  constructor(client) {
    this.client = client;
  }

  async getUploadUrl(fileName) {
    return this.client.getSignedUrlPromise(
      "putObject",
      getBucketParams(fileName)
    );
  }
}

export default new FileImportService(getS3Client());
