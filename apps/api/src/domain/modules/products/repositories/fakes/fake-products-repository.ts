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

    return new Promise((resolve) =>
      setTimeout(() => resolve(new Product(product)), 120)
    );
  }

  findBySlug(slug: string): Promise<Product | null> {
    const product = this.repository.find(
      ({ slug: productSlug }) => productSlug === slug
    );

    if (!product) {
      return new Promise((resolve) => setTimeout(() => resolve(null), 120));
    }

    return new Promise((resolve) =>
      setTimeout(() => resolve(new Product(product)), 120)
    );
  }

  async findAll(): Promise<Product[]> {
    return this.repository.map((product) => new Product(product));
  }
}

export default FakeProductsRepository;
