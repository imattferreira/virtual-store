// TODO sanitize each param
import productPresentation, {
  IProductPresentation,
} from "../../presentations/productPresentation";
import Validate from "../../../../validators/decorators/validate";
import Product from "../../models/product";
import IProductsRepository from "../../repositories/interfaces/products-repository";

export interface CreateProductParams {
  name: string;
  price: number;
  quantity: number;
  description: string;
  brandId: string;
}

export class CreateProductUseCase {
  constructor(
    private readonly productsRepository: IProductsRepository // private readonly BrandsRepository: any
  ) {}

  @Validate<CreateProductParams>({
    brandId: { required: true, type: "id" },
    description: { required: true },
    name: { required: true },
    price: { required: true, size: { min: 0 } },
    quantity: { required: true, size: { min: 0 } },
  })
  async execute({
    brandId,
    description,
    name,
    price,
    quantity,
  }: CreateProductParams): Promise<IProductPresentation> {
    const productAlreadyExists = await this.productsRepository.findByName(name);

    if (productAlreadyExists) {
      throw new Error("product already exists");
    }

    // const brandExists = await this.brandsRepository.findById(brandId);

    // if (!brandExists) {
    //   throw new Error("brand id not found");
    // }

    const product = new Product({
      brandId,
      description,
      name,
      price,
      quantity,
    });

    await this.productsRepository.create(product);

    return productPresentation(product);
  }
}

export default CreateProductUseCase;
