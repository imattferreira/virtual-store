import { Product } from "../entities/Product";
import HttpClient from "../lib/HttpClient";

interface GetProductResponse {
  product: Product;
}

interface GetAllProductsResponse {
  products: Product[];
}

class ProductRepository {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  getBySlug(slug: string): Promise<GetProductResponse> {
    try {
      return this.httpClient.get<GetProductResponse>(`/products/${slug}`);
    } catch {
      return new Promise((resolve) => resolve(null));
    }
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
