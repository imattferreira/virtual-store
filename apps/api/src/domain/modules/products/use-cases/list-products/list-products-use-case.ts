import productPresentation, {
  IProductPresentation,
} from "../../presentations/product-presentation";
import IProductsRepository from "../../repositories/interfaces/products-repository";

interface IListProductsResult {
  products: IProductPresentation[];
}

// TODO implement pagination
// TODO implement filters
class ListProductsUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute(): Promise<IListProductsResult> {
    const products = await this.productsRepository.findAll();

    return { products: products.map(productPresentation) };
  }
}

export default ListProductsUseCase;
