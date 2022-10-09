import {
  HttpRequest,
  HttpResponse,
} from "../../../../../infra/http/interfaces";
import GetProductUseCase from "./get-product-use-case";

class GetProductController {
  constructor(private readonly getProductUseCase: GetProductUseCase) {}

  async handle(req: HttpRequest, res: HttpResponse): Promise<HttpResponse> {
    const slug = req.params as string;

    const result = await this.getProductUseCase.execute({ slug });

    return res.status(200).json(result);
  }
}

export default GetProductController;
