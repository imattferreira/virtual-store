import ProductsRepository from "../../repositories/implementations/ProductsRepository";
import CreateProductController from "./create-product-controller";
import CreateProductUseCase from "./create-product-use-case";

class CreateProductFactory {
  init() {
    const createProductUseCase = new CreateProductUseCase(ProductsRepository);
    const createProductController = new CreateProductController(
      createProductUseCase
    );

    return createProductController;
  }
}

export default CreateProductFactory;
