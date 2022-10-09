import { Product } from "../entities/Product";
import HttpClient from "../lib/HttpClient";

interface GetAllProductsResponse {
  products: Product[];
}

class ProductRepository {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  getAll(): Promise<GetAllProductsResponse> {
    try {
      return this.httpClient.get<GetAllProductsResponse>("/products");
    } catch {
      return new Promise((resolve) => resolve({ products: [] }));
    }
  }
}

export default new ProductRepository();
