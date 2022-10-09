import Validate from "../../../../validators/decorators/validate";
import productPresentation, {
  IProductPresentation,
} from "../../presentations/product-presentation";
import IProductsRepository from "../../repositories/interfaces/products-repository";

interface IGetProductParams {
  slug: string;
}

interface IGetProductResult {
  product: IProductPresentation;
}

class GetProductUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  @Validate<IGetProductParams>({
    slug: { required: true },
  })
  async execute({ slug }: IGetProductParams): Promise<IGetProductResult> {
    const productExists = await this.productsRepository.findBySlug(slug);

    if (!productExists) {
      throw new Error("product not found");
    }

    const product = productPresentation(productExists);

    return { product };
  }
}

export default GetProductUseCase;
