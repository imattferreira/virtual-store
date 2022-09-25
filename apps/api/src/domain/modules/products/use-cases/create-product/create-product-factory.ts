import {
  HttpRequest,
  HttpResponse,
} from "../../../../../infra/http/interfaces";
import ProductsRepository from "../../repositories/implementations/ProductsRepository";
import CreateProductController from "./create-product-controller";
import CreateProductUseCase from "./create-product-use-case";

class CreateProductFactory {
  init(req: HttpRequest, res: HttpResponse) {
    const createProductUseCase = new CreateProductUseCase(ProductsRepository);
    const createProductController = new CreateProductController(
      createProductUseCase
    );

    return createProductController.handle(req, res);
  }
}

export default CreateProductFactory;
