import {
  HttpRequest,
  HttpResponse,
} from "../../../../../infra/http/interfaces";
import CreateProductUseCase, {
  CreateProductParams,
} from "./create-product-use-case";

class CreateProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  async handle(req: HttpRequest, res: HttpResponse): Promise<HttpResponse> {
    const { brandId, description, name, price, quantity, image } =
      req.body as CreateProductParams;

    const result = await this.createProductUseCase.execute({
      brandId,
      description,
      image,
      name,
      price,
      quantity,
    });

    return res.status(201).json(result);
  }
}

export default CreateProductController;
