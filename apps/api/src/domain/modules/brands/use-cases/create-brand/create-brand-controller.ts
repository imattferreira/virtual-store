import {
  HttpRequest,
  HttpResponse,
} from "../../../../../infra/http/interfaces";
import CreateBrandUseCase, { CreateBrandParams } from "./create-brand-use-case";

class CreateProductController {
  constructor(private readonly createProductUseCase: CreateBrandUseCase) {}

  async handle(req: HttpRequest, res: HttpResponse): Promise<HttpResponse> {
    const { name } = req.body as CreateBrandParams;

    const result = await this.createProductUseCase.execute({
      name,
    });

    return res.status(201).json(result);
  }
}

export default CreateProductController;
