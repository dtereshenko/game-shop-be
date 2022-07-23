import { Product } from "../types/Product";
import productRepo from "@services/productRepo";

class ProductService {
  async getAll(): Promise<Product[]> | never {
    try {
      const { rows: games } = await productRepo.find();
      console.log("products", games);

      productRepo.end();

      return games;
    } catch (e) {
      productRepo.end();

      console.log("Error while retrieving products");
      console.log(e?.response?.body);

      throw e?.response?.body;
    }
  }

  async findById(
    uuid: string = "b2cba874-a24a-4052-8755-b76cc9dabbe4"
  ): Promise<Product> | never {
    try {
      console.log("Requesting product by uuid ", uuid);

      const {
        rows: [product],
      } = await productRepo.findOneBy(uuid);

      productRepo.end();

      console.log("product", product);

      return product;
    } catch (e) {
      productRepo.end();

      console.log("Error while retrieving product by id ", uuid);
      console.log(e?.response?.body);
      throw e?.response?.body;
    }
  }
}

export default new ProductService();
