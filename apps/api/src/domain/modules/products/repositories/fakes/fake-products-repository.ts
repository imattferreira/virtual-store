import Product from "../../models/product";
import IProductsRepository from "../interfaces/products-repository";

class FakeProductsRepository implements IProductsRepository {
  repository: Product[] = [];

  async create(product: Product): Promise<void> {
    this.repository.push(product);
  }

  findByName(name: string): Promise<Product | null> {
    const product = this.repository.find(
      ({ name: productName }) => productName === name
    );

    if (!product) {
      return new Promise((resolve) => setTimeout(() => resolve(null), 120));
    }

    return new Promise((resolve) => setTimeout(() => resolve(product), 120));
  }
}

export default FakeProductsRepository;
