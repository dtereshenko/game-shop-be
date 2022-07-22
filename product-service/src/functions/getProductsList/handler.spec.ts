import { getProductsList } from "./handler";
import productService from "@services/productService";

const mockProducts = [
  {
    title: "Street Fighters III",
    price: 15,
    description: "Fighting",
  },
  {
    title: "Atlantis",
    price: 25,
    description: "Adventure & movie playground",
  },
];

jest.mock("@services/productService", () => ({
  __esModule: true,
  default: {
    getAll: jest.fn(() => Promise.resolve(mockProducts)),
  },
}));

describe("getProductList handler", function () {
  it("should return response 200 with list of the products", async function () {
    // @ts-ignore
    const { statusCode, body } = await getProductsList(null, null, null);

    expect(statusCode).toBe(200);
    expect(body).toMatchSnapshot();
  });

  it("should return response 500 with error message", async function () {
    (productService.getAll as jest.Mock).mockRejectedValue(
      "Internal Server Error"
    );

    // @ts-ignore
    const { statusCode, body } = await getProductsList(null, null, null);

    expect(statusCode).toBe(500);
    expect(body).toMatchSnapshot();
  });
});
