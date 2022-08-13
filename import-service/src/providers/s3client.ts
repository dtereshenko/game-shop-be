import * as AWS from "aws-sdk";
import { AWS_REGION } from "@libs/config";
import { S3Event } from "aws-lambda";

export const getS3Client = () => new AWS.S3({ region: AWS_REGION });

export const getObjectKey = (event: S3Event): string =>
  event.Records[0].s3.object.key;
