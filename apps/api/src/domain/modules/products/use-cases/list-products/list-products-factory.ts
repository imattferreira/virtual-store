import {
  HttpRequest,
  HttpResponse,
} from "../../../../../infra/http/interfaces";
import ProductsRepository from "../../repositories/implementations/products-repository";
import ListProductsController from "./list-products-controller";
import ListProductsUseCase from "./list-products-use-case";

class ListProductsFactory {
  init(req: HttpRequest, res: HttpResponse) {
    const listProductsUseCase = new ListProductsUseCase(ProductsRepository);
    const listProductsController = new ListProductsController(
      listProductsUseCase
    );

    return listProductsController.handle(req, res);
  }
}

export default ListProductsFactory;
