import {
  HttpRequest,
  HttpResponse,
} from "../../../../../infra/http/interfaces";
import ListProductsUseCase from "./list-products-use-case";

class ListProductsController {
  constructor(private readonly listProductsUseCase: ListProductsUseCase) {}

  async handle(req: HttpRequest, res: HttpResponse): Promise<HttpResponse> {
    const result = await this.listProductsUseCase.execute();

    return res.status(200).json(result);
  }
}

export default ListProductsController;
