import Image from "../../entities/image";
import IImagesRepository from "../interfaces/images-repository";
import { StoredImage } from "../interfaces/stored-entities";
import ImageMapper from "../mappers/image-mapper";

class FakeImagesRepository implements IImagesRepository {
  private repository: StoredImage[] = [];

  async create(image: Image): Promise<void> {
    this.repository.push(ImageMapper.toPersistance(image));
  }
}

export default FakeImagesRepository;
