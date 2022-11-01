import { describe, expect, it } from "../../../../../tests";
// import Image from "../../entities/image";
import FakeImagesRepository from "../../repositories/fakes/fake-images-repository";
import UploadImageUseCase, { UploadImageParams } from "./upload-image-use-case";

const makeSut = () => {
  const fakeImagesRepository = new FakeImagesRepository();
  const uploadImageUseCase = new UploadImageUseCase(fakeImagesRepository);

  return { fakeImagesRepository, uploadImageUseCase };
};

describe("[UploadImageUseCase]", () => {
  it.todo.concurrent("should be able to upload a new image", async () => {});

  it.todo(
    "should not be able to upload a image with an invalid mime type",
    async () => {}
  );
  it.todo("should not be able to upload a image with an invalid file size ");

  it.todo("should not be able to upload a image with an negative file size");

  it.todo("should not be able to create an undefined file");
});
