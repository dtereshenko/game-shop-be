import { S3Handler } from "aws-lambda";
import fileParserService from "@libs/FileParserService";
import { getObjectKey } from "../../providers/s3client";
import sqsClient from "../../providers/sqsClient";

export const importFileParser: S3Handler = async (event) => {
  console.log("Parsing products file");

  const objectKey = getObjectKey(event);

  const s3ObjectReadableStream =
    fileParserService.getObjectReadableStream(objectKey);

  s3ObjectReadableStream
    .on("error", (e) => {
      console.error(e.message);
    })
    .on("end", () => {
      console.log("Complete reading the file");
    });

  console.log("Reading chunks from the file");
  for await (const chunk of s3ObjectReadableStream) {
    console.log("Sending product to queue", chunk);
    const sqsResponse = await sqsClient.sendMessage({ payload: chunk });
    console.log("Message have been sent", sqsResponse);
  }

  console.log("Moving to parsed folder");
  try {
    await fileParserService.moveToParsedFolder(objectKey);
  } catch (e) {
    console.error("Error while moving to parsed folder", e.message);
  }
};
