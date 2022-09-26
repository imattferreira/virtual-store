import database from "../../../../../infra/database";
import Product from "../../models/product";
import IProductsRepository from "../interfaces/products-repository";

class ProductsRepository implements IProductsRepository {
  async create({
    id,
    brandId,
    createdAt,
    description,
    name,
    price,
    quantity,
    updatedAt,
  }: Product): Promise<void> {
    await database.product.create({
      data: {
        description,
        id,
        name,
        price,
        quantity,
        brandId,
        updatedAt,
        createdAt,
      },
    });
  }

  async findByName(name: string): Promise<Product | null> {
    const product = await database.product.findUnique({ where: { name } });

    if (!product) {
      return null;
    }

    return new Product(product);
  }

  async findAll(): Promise<Product[]> {
    const products = await database.product.findMany();

    return products.map((product) => new Product(product));
  }
}

export default new ProductsRepository();
