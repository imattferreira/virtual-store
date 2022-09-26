import productPresentation, {
  IProductPresentation,
} from "../../presentations/product-presentation";
import IProductsRepository from "../../repositories/interfaces/products-repository";

// TODO implement pagination
// TODO implement filters
// TODO return like { products: [] }
class ListProductsUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute(): Promise<IProductPresentation[]> {
    const products = await this.productsRepository.findAll();

    return products.map(productPresentation);
  }
}

export default ListProductsUseCase;
