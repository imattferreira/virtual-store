import {
  HttpRequest,
  HttpResponse,
} from "../../../../../infra/http/interfaces";
import BrandsRepository from "../../repositories/implementations/brands-repository";
import CreateBrandController from "./create-brand-controller";
import CreateBrandUseCase from "./create-brand-use-case";

class CreateBrandFactory {
  init(req: HttpRequest, res: HttpResponse) {
    const createBrandUseCase = new CreateBrandUseCase(BrandsRepository);
    const createBrandController = new CreateBrandController(createBrandUseCase);

    return createBrandController.handle(req, res);
  }
}

export default CreateBrandFactory;
