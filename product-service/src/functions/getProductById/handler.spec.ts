import { getProductById } from "./handler";
import productService from "@services/productService";

const mockProduct = {
  title: "Street Fighters III",
  price: 15,
  description: "Fighting",
};

jest.mock("@services/productService", () => ({
  __esModule: true,
  default: {
    findById: jest.fn(() => Promise.resolve(mockProduct)),
  },
}));

describe("getProductById handler", function () {
  it("should return response 200 with the requested product", async function () {
    const productResponse = await getProductById(null, null, () => {});

    // @ts-ignore
    const { statusCode, body } = productResponse;

    expect(statusCode).toEqual(200);
    expect(body).toMatchSnapshot();
  });

  it('should return response 404 with "Product not found" message', async function () {
    (productService.findById as jest.Mock).mockRejectedValue(
      "Product Not found"
    );

    const productResponse = await getProductById(null, null, () => {});

    // @ts-ignore
    const { statusCode, body } = productResponse;

    expect(statusCode).toEqual(404);
    expect(body).toMatchSnapshot();
  });
});
