import { S3Handler } from "aws-lambda";
import fileParserService from "@libs/FileParserService";
import { getObjectKey } from "@libs/s3client";

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
    console.log(chunk);
  }

  console.log("Moving to parsed folder");
  try {
    await fileParserService.moveToParsedFolder(objectKey);
  } catch (e) {
    console.error("Error while moving to parsed folder", e.message);
  }
};
