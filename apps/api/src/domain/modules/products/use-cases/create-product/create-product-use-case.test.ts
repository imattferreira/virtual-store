import { randomBytes } from "crypto";
import { describe, expect, it } from "vitest";
import Product from "../../models/product";
import FakeProductsRepository from "../../repositories/fakes/fake-products-repository";
import CreateProductUseCase, {
  CreateProductParams,
} from "./create-product-use-case";

const genRandomInt = (min = 0, max = 1000) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const genRandomStr = (min = 1, max = 100) =>
  randomBytes(genRandomInt(min, max)).toString("base64");

const makeSut = () => {
  const productsRepository = new FakeProductsRepository();
  const createProductUseCase = new CreateProductUseCase(productsRepository);

  return { createProductUseCase, productsRepository };
};

describe("[CreateProductUseCase]", () => {
  it.concurrent("should be able to register a new product", async () => {
    const { createProductUseCase, productsRepository } = makeSut();
    const data: CreateProductParams = {
      brandName: genRandomStr(5, 12),
      description: genRandomStr(30, 2000),
      name: genRandomStr(15, 52),
      price: genRandomInt(1, 152000) / 100,
      quantity: genRandomInt(1, 1200),
    };

    const result = await createProductUseCase.execute(data);
    expect(result).toBeInstanceOf(Product);
    expect(result).toHaveProperty("id");
  });

  it("should be able to call ProductsRepository once when register a new product", async () => {
    const { createProductUseCase, productsRepository } = makeSut();
    const data: CreateProductParams = {
      brandName: genRandomStr(5, 12),
      description: genRandomStr(30, 2000),
      name: genRandomStr(15, 52),
      price: genRandomInt(1, 152000) / 100,
      quantity: genRandomInt(1, 1200),
    };

    await createProductUseCase.execute(data);

    expect(productsRepository).toBeCalledTimes(1);
  });

  it("should not be able to register a product with invalid price", async () => {
    const { createProductUseCase } = makeSut();
    const data: CreateProductParams = {
      brandName: genRandomStr(5, 12),
      description: genRandomStr(30, 2000),
      name: genRandomStr(15, 52),
      price: genRandomInt(-100, 0) / 100,
      quantity: genRandomInt(1, 1200),
    };

    expect(createProductUseCase.execute(data)).resolves.toThrowError(
      "invalid price"
    );
  });

  it("should not be able to register a product with invalid quantity", async () => {
    const { createProductUseCase } = makeSut();
    const data: CreateProductParams = {
      brandName: genRandomStr(5, 12),
      description: genRandomStr(30, 2000),
      name: genRandomStr(15, 52),
      price: genRandomInt(1, 190) / 100,
      quantity: genRandomInt(-1011, 0),
    };

    expect(createProductUseCase.execute(data)).resolves.toThrowError(
      "invalid quantity"
    );
  });

  it("should not be able to register a product already registered", async () => {
    const { createProductUseCase } = makeSut();
    const data: CreateProductParams = {
      brandName: genRandomStr(5, 12),
      description: genRandomStr(30, 2000),
      name: genRandomStr(15, 52),
      price: genRandomInt(1, 152000) / 100,
      quantity: genRandomInt(1, 1200),
    };

    await createProductUseCase.execute(data);

    expect(createProductUseCase.execute(data)).resolves.toThrowError(
      "product already exists"
    );
  });
});
