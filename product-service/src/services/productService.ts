import { Product } from "../types/Product";
import productRepo from "@services/productRepo";

class ProductService {
  async getAll(): Promise<Product[]> | never {
    try {
      const games = await productRepo.find();
      console.log("products", games);

      return games;
    } catch (e) {
      console.log("Error while retrieving products");
      console.log(e.message);

      throw e;
    }
  }

  async findById(uuid: string): Promise<Product> | never {
    try {
      return productRepo.findOneBy(uuid);
    } catch (e) {
      console.log("Error while retrieving product by id ", uuid);
      throw e;
    }
  }

  async create(product): Promise<boolean> | never {
    try {
      const status = await productRepo.create(product);
      return status;
    } catch (e) {
      console.log("Error while creating new product", product);
      throw e;
    }
  }
}

export default new ProductService();
