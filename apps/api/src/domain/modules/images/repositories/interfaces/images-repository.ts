import Image from "../../entities/image";

interface IImagesRepository {
  create(data: Image): Promise<void>;
}

export default IImagesRepository;
