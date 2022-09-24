import Product from "../../models/product";
import IProductsRepository from "../interfaces/products-repository";

class ProductsRepository implements IProductsRepository {
  create(params: Product): Promise<void> {
    throw new Error("Method not implemented.");
  }

  findByName(name: string): Promise<Product | null> {
    throw new Error("Method not implemented.");
  }
}

export default new ProductsRepository();
