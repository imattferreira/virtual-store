import Image from "../../entities/image";
import { StoredImage } from "../interfaces/stored-entities";

class ImageMapper {
  toPersistance({ createdAt, id, name, path }: Image): StoredImage {
    return {
      created_at: createdAt,
      id,
      name,
      path,
    };
  }
}

export default new ImageMapper();
