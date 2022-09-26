import Product from "../../models/product";

interface IProductsRepository {
  create(params: Product): Promise<void>;
  findByName(name: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
}

export default IProductsRepository;
