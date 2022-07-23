import type { AWS } from "@serverless/typescript";
import { getProductsList, getProductById, createProduct } from "@functions";

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
  functions: { getProductsList, getProductById, createProduct },
  package: { individually: true },
  custom: {
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
