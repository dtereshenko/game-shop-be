import { importProductsFile } from "./handler";

jest.mock("@libs/FileImportService", () => ({
  __esModule: true,
  default: {
    getUploadUrl: () => "uploadUrl",
  },
}));

describe("importProductFile handler", function () {
  it("should return validation message in case of empty file name", async function () {
    expect(await importProductsFile(null, null, null)).toMatchSnapshot();
  });

  it("should return validation message if the length of the file name less than 5 symbols", async function () {
    const event = {
      queryStringParameters: {
        name: ".csv",
      },
    };
    // @ts-ignore
    expect(await importProductsFile(event, null, null)).toMatchSnapshot();
  });

  it("should return validation message if the length of the file name more than 20 symbols", async function () {
    const event = {
      queryStringParameters: {
        name: "loooooooooooooooooooooong-file-naaaaaaaaame.csv",
      },
    };
    // @ts-ignore
    expect(await importProductsFile(event, null, null)).toMatchSnapshot();
  });

  it("should return validation message if the file name does not have .csv extension", async function () {
    const event = {
      queryStringParameters: {
        name: "file-name.txt",
      },
    };
    // @ts-ignore
    expect(await importProductsFile(event, null, null)).toMatchSnapshot();
  });

  it("should return the signed URL for upload", async function () {
    const event = {
      queryStringParameters: {
        name: "file-name.csv",
      },
    };
    // @ts-ignore
    expect(await importProductsFile(event, null, null)).toMatchSnapshot();
  });
});
