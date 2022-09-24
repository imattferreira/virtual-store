import Product from "../../models/product";

interface IProductsRepository {
  create(params: Product): Promise<void>;
  findByName(name: string): Promise<Product | null>;
}

export default IProductsRepository;
