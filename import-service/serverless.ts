import type { AWS } from "@serverless/typescript";

import { importProductsFile, importFileParser } from "@functions/index";

const serverlessConfiguration: AWS = {
  service: "import-service",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],

  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    region: "eu-west-1",
    profile: "di.tereshenko",
    stage: "dev",
    httpApi: {
      cors: true,
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      AWS_ACCOUNT_ID: { Ref: "AWS::AccountId" },
      IMPORT_QUEUE_NAME: "${ssm:/product-imported-queue-name}",
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: "s3:ListBucket",
        Resource: ["arn:aws:s3:::product-docs-csv"],
      },
      {
        Effect: "Allow",
        Action: ["s3:*"],
        Resource: ["arn:aws:s3:::product-docs-csv/*"],
      },
      {
        Effect: "Allow",
        Action: ["sqs:SendMessage", "sqs:GetQueueUrl"],
        Resource: {
          "Fn::Join": [
            ":",
            [
              "arn:aws:sqs",
              { Ref: "AWS::Region" },
              { Ref: "AWS::AccountId" },
              "${self:provider.environment.IMPORT_QUEUE_NAME}",
            ],
          ],
        },
      },
    ],
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser },
  package: { individually: true },
  resources: {
    extensions: {
      HttpApiStage: {
        Properties: {
          StageName: "${self:provider.stage}",
        },
      },
    },
  },

  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node16",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
