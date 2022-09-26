import { describe, expect, it } from "../../../../../tests";
import fakes from "../../../../../tests/fakes";
import { genRandomInt, genRandomStr } from "../../../../../tests/utils";
import Product from "../../models/product";
import FakeProductsRepository from "../../repositories/fakes/fake-products-repository";
import { CreateProductParams } from "../create-product/create-product-use-case";
import ListProductsUseCase from "./list-products-use-case";

const genProduct = (): CreateProductParams => ({
  brandId: fakes.id(),
  description: genRandomStr(30, 2000),
  name: genRandomStr(15, 52),
  price: genRandomInt(1, 152000) / 100,
  quantity: genRandomInt(1, 1200),
});

const makeSut = () => {
  const fakeProductsRepository = new FakeProductsRepository();
  const listProductsUseCase = new ListProductsUseCase(fakeProductsRepository);

  return { fakeProductsRepository, listProductsUseCase };
};

describe("[ListProductsUseCase]", () => {
  it("should be able to list all products", async () => {
    const { fakeProductsRepository, listProductsUseCase } = makeSut();

    fakeProductsRepository.create(new Product(genProduct()));
    fakeProductsRepository.create(new Product(genProduct()));
    fakeProductsRepository.create(new Product(genProduct()));
    fakeProductsRepository.create(new Product(genProduct()));
    fakeProductsRepository.create(new Product(genProduct()));
    fakeProductsRepository.create(new Product(genProduct()));
    fakeProductsRepository.create(new Product(genProduct()));
    fakeProductsRepository.create(new Product(genProduct()));
    fakeProductsRepository.create(new Product(genProduct()));
    fakeProductsRepository.create(new Product(genProduct()));

    await expect(listProductsUseCase.execute()).resolves.toHaveLength(10);
  });
});
