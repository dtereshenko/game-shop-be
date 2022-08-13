import { APIGatewayHandler, formatJSONResponse } from "@libs/api-gateway";
import fileImportService from "@libs/FileImportService";
import {
  FILE_NAME_PARAM_NAME,
  schema,
  validatorOptions,
} from "@functions/importProductsFile/schema/validation";

export const importProductsFile: APIGatewayHandler = async (event) => {
  console.log("Importing products file");

  console.log("event", event);

  // Validate input parameters
  // '?? {}' is used to handle the case with event.queryStringParameters === undefined
  // since joi doesn't return error as expected in that case
  const { error } = schema.validate(
    event?.queryStringParameters ?? {},
    validatorOptions
  );

  console.log("error", error);
  if (error) {
    return formatJSONResponse({
      status: 400,
      response: { error: error?.details?.[0]?.message },
    });
  }

  const fileName = event.queryStringParameters[FILE_NAME_PARAM_NAME];

  try {
    const signedUrl = await fileImportService.getUploadUrl(fileName);
    console.log("signedUrl", signedUrl);

    return formatJSONResponse({ response: { url: signedUrl } });
  } catch (e) {
    console.log("Error while generating signed URL", e.message);

    return formatJSONResponse({
      status: 500,
      response: {
        message: e.message,
      },
    });
  }
};
