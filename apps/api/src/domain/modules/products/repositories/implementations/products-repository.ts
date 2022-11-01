import database from "../../../../../infra/database";
import Product from "../../models/product";
import IProductsRepository from "../interfaces/products-repository";
import { StoredProduct } from "../interfaces/stored-entities";
import ProductMapper from "../mappers/product-mapper";

class ProductsRepository implements IProductsRepository {
  async create(product: Product): Promise<void> {
    const {
      brand_id,
      created_at,
      description,
      id,
      image,
      name,
      price,
      quantity,
      slug,
      updated_at,
    } = ProductMapper.toPersistance(product);

    await database.product.create({
      data: {
        description,
        id,
        slug,
        image,
        name,
        price,
        quantity,
        brand_id,
        created_at,
        updated_at,
      },
    });
  }

  async findByName(name: string): Promise<Product | null> {
    const product = (await database.product.findUnique({
      where: { name },
    })) as StoredProduct | null;

    if (!product) {
      return null;
    }

    return ProductMapper.toDomain(product);
  }

  async findBySlug(slug: string): Promise<Product | null> {
    const product = (await database.product.findUnique({
      where: { slug },
    })) as StoredProduct | null;

    if (!product) {
      return null;
    }

    return ProductMapper.toDomain(product);
  }

  async findAll(): Promise<Product[]> {
    const products = (await database.product.findMany()) as unknown as
      | StoredProduct[];

    return products.map(ProductMapper.toDomain);
  }
}

export default new ProductsRepository();
