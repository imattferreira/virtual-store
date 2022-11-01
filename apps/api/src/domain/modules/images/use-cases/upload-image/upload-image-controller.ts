import {
  HttpRequest,
  HttpResponse,
} from "../../../../../infra/http/interfaces";
import UploadImageUseCase from "./upload-image-use-case";

class UploadImageController {
  constructor(private readonly uploadImageUseCase: UploadImageUseCase) {}

  async handle(req: HttpRequest, res: HttpResponse): Promise<HttpResponse> {
    const { file } = req;

    const result = await this.uploadImageUseCase.execute({ file });

    return res.status(201).json(result);
  }
}

export default UploadImageController;
