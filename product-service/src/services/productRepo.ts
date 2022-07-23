import { Client } from "pg";

const dbOption = {
  user: process.env.DB_USER || "postgres",
  host:
    process.env.DB_HOST ||
    "product-service-pgql.c6dsfu9l1eca.eu-west-1.rds.amazonaws.com",
  database: process.env.DB_NAME || "product",
  password: process.env.DB_PASSWORD || "password here",
  port: +process.env.DB_PORT || 5432,
  debug: true,
  delayMs: 3000,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

class ProductRepo {
  private client: any;

  constructor() {
    this.client = new Client(dbOption);
    this.client.connect();
  }

  async find() {
    return this.client.query(
      "select p.id, p.title, p.description , p.price , s.count  from products p inner join stocks s on s.product_id = p.id"
    );
  }

  async findOneBy(uuid) {
    return this.client.query(
      `select p.id, p.title, p.description , p.price , s.count  from products p inner join stocks s on s.product_id = p.id and p.id = '${uuid}'`
    );
  }

  end() {
    this.client.end();
  }
}

export default new ProductRepo();
