import { describe, it, expect } from "../../../../../tests";
import faker from "../../../../../tests/fakes";
import Brand from "../../../brands/entities/brand";
import { genRandomInt, genRandomStr } from "../../../../../tests/utils";
import FakeBrandsRepository from "../../../brands/repositories/fakes/fake-brands-repository";
import Product from "../../models/product";
import FakeProductsRepository from "../../repositories/fakes/fake-products-repository";
import CreateProductUseCase, {
  CreateProductParams,
} from "./create-product-use-case";

const makeImageName = () =>
  genRandomStr(10, 30)
    .split("")
    .filter((letter) => /[a-z0-9]/i.test(letter))
    .join("");

const makeSut = () => {
  const fakeProductsRepository = new FakeProductsRepository();
  const fakeBrandsRepository = new FakeBrandsRepository();
  const createProductUseCase = new CreateProductUseCase(
    fakeProductsRepository,
    fakeBrandsRepository
  );

  return { createProductUseCase, fakeProductsRepository, fakeBrandsRepository };
};

describe("[CreateProductUseCase]", () => {
  it.concurrent("should be able to register a new product", async () => {
    const {
      createProductUseCase,
      fakeProductsRepository,
      fakeBrandsRepository,
    } = makeSut();
    const brandId = faker.id();

    await fakeBrandsRepository.create(
      new Brand({ id: brandId, name: genRandomStr(1, 10) })
    );

    const data: CreateProductParams = {
      brandId,
      description: genRandomStr(30, 2000),
      image: `/${makeImageName()}.webp`,
      name: genRandomStr(15, 52),
      price: genRandomInt(1, 152000) / 100,
      quantity: genRandomInt(1, 1200),
    };

    const result = await createProductUseCase.execute(data);

    expect(result).toHaveProperty("id");
    expect(
      fakeProductsRepository.findByName(data.name)
    ).resolves.toBeInstanceOf(Product);
  });

  it("should be able to register a product with your specific slug", async () => {
    const {
      createProductUseCase,
      fakeProductsRepository,
      fakeBrandsRepository,
    } = makeSut();
    const brandId = faker.id();

    await fakeBrandsRepository.create(
      new Brand({ id: brandId, name: genRandomStr(1, 10) })
    );

    const data: CreateProductParams = {
      brandId,
      description: genRandomStr(30, 2000),
      name: genRandomStr(15, 52),
      image: `/${makeImageName()}.webp`,
      price: genRandomInt(1, 152000) / 100,
      quantity: genRandomInt(1, 1200),
    };

    const result = await createProductUseCase.execute(data);

    expect(result).toHaveProperty("slug");
    expect(result.slug).not.toBeNull();
  });

  it("should not be able to register a product with invalid price", async () => {
    const { createProductUseCase, fakeBrandsRepository } = makeSut();
    const brandId = faker.id();

    await fakeBrandsRepository.create(
      new Brand({ id: brandId, name: genRandomStr(1, 10) })
    );

    const data: CreateProductParams = {
      brandId,
      description: genRandomStr(30, 2000),
      name: genRandomStr(15, 52),
      image: `/${makeImageName()}.webp`,
      price: genRandomInt(-100, 0) / 100,
      quantity: genRandomInt(1, 1200),
    };

    await expect(createProductUseCase.execute(data)).rejects.toThrowError(
      "invalid price"
    );
  });

  it("should not be able to register a product with invalid quantity", async () => {
    const { createProductUseCase, fakeBrandsRepository } = makeSut();
    const brandId = faker.id();

    await fakeBrandsRepository.create(
      new Brand({ id: brandId, name: genRandomStr(1, 10) })
    );

    const data: CreateProductParams = {
      brandId,
      description: genRandomStr(30, 2000),
      name: genRandomStr(15, 52),
      image: `/${makeImageName()}.webp`,
      price: genRandomInt(1, 190) / 100,
      quantity: genRandomInt(-1011, 0),
    };

    await expect(createProductUseCase.execute(data)).rejects.toThrowError(
      "invalid quantity"
    );
  });

  it("should not be able to register a product already registered", async () => {
    const { createProductUseCase, fakeBrandsRepository } = makeSut();
    const brandId = faker.id();

    await fakeBrandsRepository.create(
      new Brand({ id: brandId, name: genRandomStr(1, 10) })
    );

    const data: CreateProductParams = {
      brandId,
      description: genRandomStr(30, 2000),
      name: genRandomStr(15, 52),
      image: `/${makeImageName()}.webp`,
      price: genRandomInt(1, 152000) / 100,
      quantity: genRandomInt(1, 1200),
    };

    await createProductUseCase.execute(data);

    await expect(createProductUseCase.execute(data)).rejects.toThrowError(
      "product already exists"
    );
  });

  it("should not be able to register a product with an nonexisting brand id", async () => {
    const { createProductUseCase, fakeBrandsRepository } = makeSut();
    const brandId = faker.id();

    await fakeBrandsRepository.create(
      new Brand({ id: brandId, name: genRandomStr(1, 10) })
    );

    const data: CreateProductParams = {
      brandId: faker.id(),
      description: genRandomStr(30, 2000),
      name: genRandomStr(15, 52),
      image: `/${makeImageName()}.webp`,
      price: genRandomInt(1, 152000) / 100,
      quantity: genRandomInt(1, 1200),
    };

    await expect(createProductUseCase.execute(data)).rejects.toThrowError(
      "brand id not found"
    );
  });

  it("should not be able to register a product with an image from a unknown domain", async () => {
    const { createProductUseCase, fakeBrandsRepository } = makeSut();
    const brandId = faker.id();

    await fakeBrandsRepository.create(
      new Brand({ id: brandId, name: genRandomStr(1, 10) })
    );

    const data: CreateProductParams = {
      brandId: faker.id(),
      description: genRandomStr(30, 2000),
      name: genRandomStr(15, 52),
      image: `https://www.${makeImageName()}.webp`,
      price: genRandomInt(1, 152000) / 100,
      quantity: genRandomInt(1, 1200),
    };

    await expect(createProductUseCase.execute(data)).rejects.toThrowError(
      "invalid image url"
    );
  });

  it("should be able to register a product with an image that your MIME type is equal to webp", async () => {
    const { createProductUseCase, fakeBrandsRepository } = makeSut();
    const brandId = faker.id();

    await fakeBrandsRepository.create(
      new Brand({ id: brandId, name: genRandomStr(1, 10) })
    );

    const data: CreateProductParams = {
      brandId: faker.id(),
      description: genRandomStr(30, 2000),
      name: genRandomStr(15, 52),
      image: `/${makeImageName()}.webp`,
      price: genRandomInt(1, 152000) / 100,
      quantity: genRandomInt(1, 1200),
    };

    await expect(createProductUseCase.execute(data)).rejects.toThrowError(
      "brand id not found"
    );
  });
});
