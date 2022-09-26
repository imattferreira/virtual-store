import { describe, expect, it } from "../../../../../tests";
import Brand from "../../models/brand";
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

    expect(result).toBeInstanceOf(Brand);
    expect(result).toHaveProperty("id");
    expect(fakeBrandsRepository.findById(result.id)).not.toBeNull();
  });

  it("should be able to call once the BrandsRepository when create a new brand", async () => {
    const { createBrandUseCase, fakeBrandsRepository } = makeSut();
    const data: CreateBrandParams = {
      name: genRandomStr(10, 20),
    };

    await createBrandUseCase.execute(data);

    expect(fakeBrandsRepository).toHaveBeenCalledOnce();
  });

  it("should not be able to create a already existing brand", async () => {
    const { createBrandUseCase } = makeSut();
    const data: CreateBrandParams = {
      name: genRandomStr(10, 20),
    };

    await createBrandUseCase.execute(data);

    expect(createBrandUseCase.execute(data)).resolves.toThrow(
      "brand already exists"
    );
  });

  it("should not be able to create a brand with an empty name", async () => {
    const { createBrandUseCase } = makeSut();

    expect(createBrandUseCase.execute({ name: "" })).resolves.toThrowError(
      "field is required"
    );
  });
});
