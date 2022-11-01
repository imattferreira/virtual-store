import Validate from "../../../../validators/decorators/validate";
import Image from "../../entities/image";
import IImagesRepository from "../../repositories/interfaces/images-repository";

export interface UploadImageParams {
  file?: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    filename: string;
    path: string;
    size: number;
  };
}

interface UploadImagePresentation {
  imageUrl: string;
}

const MAX_FILE_SIZE = 100_000; // 100000kb or 100mb
const ACCEPTED_MIME_TYPES = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/webp",
];

class UploadImageUseCase {
  constructor(private readonly imagesRepository: IImagesRepository) {}

  @Validate<UploadImageParams>({
    file: {
      size: {
        min: 1,
        max: MAX_FILE_SIZE,
      },
    },
  })
  async execute({ file }: UploadImageParams): Promise<UploadImagePresentation> {
    if (!file) {
      throw new Error("file not found");
    }

    if (!ACCEPTED_MIME_TYPES.includes(file.mimetype)) {
      throw new Error("invalid mime type");
    }

    // TODO can be removed?
    // if (file.size > MAX_FILE_SIZE) {
    //   throw new Error("file size exceeds");
    // }

    const image = new Image({ name: file.filename, path: file.path });

    await this.imagesRepository.create(image);

    // TODO implement presentation
    // TODO sanitize image path
    return { imageUrl: image.path };
  }
}

export default UploadImageUseCase;
