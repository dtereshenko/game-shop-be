import type { AWS } from "@serverless/typescript";
import {
  getProductsList,
  getProductById,
  createProduct,
  catalogBatchProcess,
} from "@functions";

const serverlessConfiguration: AWS = {
  service: "product-service",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    region: "eu-west-1",
    profile: "di.tereshenko",
    stage: "dev",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "ssm:GetParameter",
          "ssm:GetParameters",
          "ssm:GetParametersByPath",
        ],
        Resource: "*",
      },
      {
        Effect: "Allow",
        Action: ["sns:Publish"],
        Resource: {
          Ref: "CreateProductTopic",
        },
      },
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      PG_USER: "${env:PG_USER}",
      PG_HOST: "${env:PG_HOST}",
      PG_PASSWORD: "${env:PG_PASSWORD}",
      PG_DATABASE: "${env:PG_DATABASE}",
      PG_PORT: "${env:PG_PORT}",
    },
  },
  functions: {
    getProductsList,
    getProductById,
    createProduct,
    catalogBatchProcess,
  },
  resources: {
    Resources: {
      CatalogItemsQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "${self:custom.IMPORT_QUEUE_NAME}",
        },
      },
      CreateProductTopic: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: "${self:custom.CREATE_PRODUCT_SNS_TOPIC}",
          Subscription: [
            {
              Endpoint: "di.tereshenko@gmail.com",
              Protocol: "email",
            },
          ],
        },
      },
    },
  },
  package: { individually: true },
  custom: {
    IMPORT_QUEUE_NAME: "${ssm:/product-imported-queue-name}",
    CREATE_PRODUCT_SNS_TOPIC: "createProductTopic",
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk", "pg-native"],
      target: "node16",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
  useDotenv: true,
};

module.exports = serverlessConfiguration;
