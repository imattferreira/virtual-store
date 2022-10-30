import Product from "../../models/product";
import IProductsRepository from "../interfaces/products-repository";
import { StoredProduct } from "../interfaces/stored-entities";
import ProductMapper from "../mappers/product-mapper";

class FakeProductsRepository implements IProductsRepository {
  repository: StoredProduct[] = [];

  async create(product: Product): Promise<void> {
    this.repository.push(ProductMapper.toPersistance(product));
  }

  findByName(name: string): Promise<Product | null> {
    const product = this.repository.find(
      ({ name: productName }) => productName === name
    );

    if (!product) {
      return new Promise((resolve) => setTimeout(() => resolve(null), 120));
    }

    return new Promise((resolve) =>
      setTimeout(() => resolve(ProductMapper.toDomain(product)), 120)
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
      setTimeout(() => resolve(ProductMapper.toDomain(product)), 120)
    );
  }

  async findAll(): Promise<Product[]> {
    return this.repository.map(ProductMapper.toDomain);
  }
}

export default FakeProductsRepository;
