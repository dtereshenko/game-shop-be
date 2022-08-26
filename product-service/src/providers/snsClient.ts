import * as AWS from "aws-sdk";

export const getSnsClient = () =>
  new AWS.SNS({ apiVersion: "2010-03-31", region: "eu-west-1" });
