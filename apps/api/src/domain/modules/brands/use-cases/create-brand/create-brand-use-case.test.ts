import { describe, expect, it } from "../../../../../tests";
import Brand from "../../entities/brand";
import { genRandomStr } from "../../../../../tests/utils";
import FakeBrandsRepository from "../../repositories/fakes/fake-brands-repository";
import CreateBrandUseCase, { CreateBrandParams } from "./create-brand-use-case";

const makeSut = () => {
  const fakeBrandsRepository = new FakeBrandsRepository();
  const createBrandUseCase = new CreateBrandUseCase(fakeBrandsRepository);

  return { fakeBrandsRepository, createBrandUseCase };
};

describe("[CreateBrandUseCase]", () => {
  it.concurrent("should be able to create a new brand", async () => {
    const { createBrandUseCase, fakeBrandsRepository } = makeSut();
    const data: CreateBrandParams = {
      name: genRandomStr(10, 20),
    };

    const result = await createBrandUseCase.execute(data);

    expect(result).toHaveProperty("id");
    await expect(
      fakeBrandsRepository.findById(result.id)
    ).resolves.toBeInstanceOf(Brand);
  });

  it("should not be able to create a already existing brand", async () => {
    const { createBrandUseCase } = makeSut();
    const data: CreateBrandParams = {
      name: genRandomStr(10, 20),
    };

    await createBrandUseCase.execute(data);

    await expect(createBrandUseCase.execute(data)).rejects.toThrowError(
      "brand already exists"
    );
  });
});
