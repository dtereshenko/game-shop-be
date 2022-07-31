import { Client } from "pg";

const dbOption = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: +process.env.PG_PORT,
  debug: true,
  delayMs: 3000,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

class ProductRepo {
  private client: any;

  async initClient() {
    if (this.client) return;

    this.client = new Client(dbOption);
    await this.client.connect();
  }

  async find() {
    try {
      await this.initClient();
      const { rows: products } = await this.client.query(
        "select p.id, p.title, p.description , p.price , s.count from products p inner join stocks s on s.product_id = p.id"
      );

      return products;
    } catch (e) {
      console.log("Error while selecting all products", e?.message);
      throw e;
    } finally {
      this.client.end();
    }
  }

  async findOneBy(uuid) {
    try {
      await this.initClient();
      const {
        rows: [product],
      } = await this.client.query(
        `select p.id, p.title, p.description , p.price , s.count  from products p inner join stocks s on s.product_id = p.id and p.id = '${uuid}'`
      );
      return product;
    } catch (e) {
      console.log("Error while retrieving product from DB by id", uuid);
      throw e;
    } finally {
      this.client.end();
    }
  }

  async create(product) {
    if (!product) {
      throw new Error("Product data is not provided");
    }
    const { title, description, price, count } = product;

    // Basic validation of product fields
    if (!title || !description || !price || !count) {
      throw new Error(
        "Product data is invalid. title, description, price, count are required"
      );
    }

    try {
      await this.initClient();

      // Create new product within the transaction
      await this.client.query("BEGIN");
      const {
        rows: [newProduct],
      } = await this.client.query(
        "insert into products (title, description, price) values ($1, $2, $3) returning *",
        [title, description, price]
      );

      console.log("new product added to products table", newProduct);

      await this.client.query(
        "insert into stocks (product_id, count) values ($1, $2)",
        [newProduct.id, count]
      );

      console.log(
        "new stocks updated with product_id, count",
        newProduct.id,
        count
      );

      await this.client.query("COMMIT");

      return true;
    } catch (e) {
      console.log("Error while creating the new product", product);
      await this.client.query("ROLLBACK");
      throw e;
    } finally {
      await this.client.end();
    }
  }
}

export default new ProductRepo();
