import {
  HttpRequest,
  HttpResponse,
} from "../../../../../infra/http/interfaces";
import GetProductUseCase from "./get-product-use-case";

interface RequestParams {
  slug: string;
}

class GetProductController {
  constructor(private readonly getProductUseCase: GetProductUseCase) {}

  async handle(req: HttpRequest, res: HttpResponse): Promise<HttpResponse> {
    const { slug } = req.params as unknown as RequestParams;

    const result = await this.getProductUseCase.execute({ slug });

    return res.status(200).json(result);
  }
}

export default GetProductController;
