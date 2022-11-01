import {
  HttpRequest,
  HttpResponse,
} from "../../../../../infra/http/interfaces";
import ImagesRepository from "../../repositories/implementations/images-repository";
import UploadImageController from "./upload-image-controller";
import UploadImageUseCase from "./upload-image-use-case";

class UploadImageFactory {
  init(req: HttpRequest, res: HttpResponse) {
    const uploadImageUseCase = new UploadImageUseCase(ImagesRepository);
    const uploadImageController = new UploadImageController(uploadImageUseCase);

    return uploadImageController.handle(req, res);
  }
}

export default UploadImageFactory;
