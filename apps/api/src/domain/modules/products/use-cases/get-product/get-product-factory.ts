import {
  HttpRequest,
  HttpResponse,
} from "../../../../../infra/http/interfaces";
import ProductsRepository from "../../repositories/implementations/ProductsRepository";
import GetProductController from "./get-product-controller";
import GetProductUseCase from "./get-product-use-case";

class GetProductFactory {
  init(req: HttpRequest, res: HttpResponse) {
    const getProductUseCase = new GetProductUseCase(ProductsRepository);
    const getProductController = new GetProductController(getProductUseCase);

    return getProductController.handle(req, res);
  }
}

export default GetProductFactory;
