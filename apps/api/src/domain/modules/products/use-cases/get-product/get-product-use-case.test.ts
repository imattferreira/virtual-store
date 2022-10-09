import { describe, expect, it } from "../../../../../tests";
import fakes from "../../../../../tests/fakes";
import { genRandomInt, genRandomStr } from "../../../../../tests/utils";
import Product from "../../models/product";
import FakeProductsRepository from "../../repositories/fakes/fake-products-repository";
import { CreateProductParams } from "../create-product/create-product-use-case";
import GetProductUseCase from "./get-product-use-case";

const genProduct = (): CreateProductParams => ({
  brandId: fakes.id(),
  slug: genRandomStr(15, 52).toLowerCase(),
  description: genRandomStr(30, 2000),
  name: genRandomStr(15, 52),
  price: genRandomInt(1, 152000) / 100,
  quantity: genRandomInt(1, 1200),
});

const makeSut = () => {
  const fakeProductsRepository = new FakeProductsRepository();
  const getProductUseCase = new GetProductUseCase(fakeProductsRepository);

  return { fakeProductsRepository, getProductUseCase };
};

describe("[GetProductUseCase]", () => {
  it.concurrent(
    "should b able to get specific product by your slug",
    async () => {
      const { fakeProductsRepository, getProductUseCase } = makeSut();

      const product = new Product(genProduct());

      fakeProductsRepository.create(new Product(genProduct()));
      fakeProductsRepository.create(product);
      fakeProductsRepository.create(new Product(genProduct()));

      const result = await getProductUseCase.execute({ slug: product.slug });

      expect(result).toHaveProperty("product");
      expect(result.product).toHaveProperty("id");
    }
  );

  it("should not be able to get a product with an nonexisting slug", async () => {
    const { fakeProductsRepository, getProductUseCase } = makeSut();

    fakeProductsRepository.create(new Product(genProduct()));
    fakeProductsRepository.create(new Product(genProduct()));
    fakeProductsRepository.create(new Product(genProduct()));

    await expect(
      getProductUseCase.execute({
        slug: genRandomStr(15, 52).toLowerCase(),
      })
    ).rejects.toThrowError("product not found");
  });
});
