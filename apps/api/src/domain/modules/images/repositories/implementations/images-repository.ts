import database from "../../../../../infra/database";
import Image from "../../entities/image";
import IImagesRepository from "../interfaces/images-repository";
import ImageMapper from "../mappers/image-mapper";

class ImagesRepository implements IImagesRepository {
  async create(image: Image): Promise<void> {
    const { created_at, id, name, path } = ImageMapper.toPersistance(image);

    await database.image.create({
      data: {
        created_at,
        id,
        name,
        path,
      },
    });
  }
}

export default new ImagesRepository();
