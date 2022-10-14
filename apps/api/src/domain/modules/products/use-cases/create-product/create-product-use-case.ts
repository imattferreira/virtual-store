// TODO sanitize each param
// TODO create custom errors
// TODO return like { product: { } }
import productPresentation, {
  IProductPresentation,
} from "../../presentations/product-presentation";
import Validate from "../../../../validators/decorators/validate";
import Product from "../../models/product";
import IProductsRepository from "../../repositories/interfaces/products-repository";
import IBrandsRepository from "../../../brands/repositories/interfaces/brands-repository";

export interface CreateProductParams {
  name: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
  brandId: string;
}

export class CreateProductUseCase {
  constructor(
    private readonly productsRepository: IProductsRepository,
    private readonly brandsRepository: IBrandsRepository
  ) {}

  @Validate<CreateProductParams>({
    brandId: { required: true, type: "id" },
    description: { required: true, length: { min: 0 } },
    name: { required: true },
    image: { type: "image", required: true },
    price: { required: true, size: { min: 0 } },
    quantity: { required: true, size: { min: 0 } },
  })
  async execute({
    brandId,
    description,
    image,
    name,
    price,
    quantity,
  }: CreateProductParams): Promise<IProductPresentation> {
    const productAlreadyExists = await this.productsRepository.findByName(name);

    if (productAlreadyExists) {
      throw new Error("product already exists");
    }

    const isImageFromSameDomain = image.startsWith("/");

    if (!isImageFromSameDomain) {
      throw new Error("invalid image url");
    }

    const brandExists = await this.brandsRepository.findById(brandId);

    if (!brandExists) {
      throw new Error("brand id not found");
    }

    const product = new Product({
      brandId,
      description,
      image,
      name,
      price,
      quantity,
    });

    await this.productsRepository.create(product);

    return productPresentation(product);
  }
}

export default CreateProductUseCase;
