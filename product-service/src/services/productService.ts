import got from "got";
import { GAMES_RESOURCE_URL } from "@config/api";
import { Product } from "../types/Product";

class ProductService {
  async getAll(): Promise<Product[]> | never {
    try {
      return await got(GAMES_RESOURCE_URL).json();
    } catch (e) {
      console.log("Error while retrieving products");
      console.log(e?.response?.body);
      throw e?.response?.body;
    }
  }

  async findById(id: string): Promise<Product> | never {
    try {
      return await got(`${GAMES_RESOURCE_URL}/${id}`).json();
    } catch (e) {
      console.log("Error while retrieving product by id ", id);
      console.log(e?.response?.body);
      throw e?.response?.body;
    }
  }
}

export default new ProductService();
