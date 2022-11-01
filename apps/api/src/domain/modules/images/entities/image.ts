import { formattedUTCDate } from "../../../../utils/date";
import { genUUID } from "../../../../utils/string";

interface IImage {
  id: string;
  name: string;
  path: string;
  createdAt: Date | string;
}

interface ICreateImage extends Omit<IImage, "id" | "createdAt"> {
  id?: string | null;
  createdAt?: Date | string | null;
}

class Image {
  private props: IImage;

  constructor({ id = null, name, path, createdAt = null }: ICreateImage) {
    this.props = {
      id: id ?? genUUID(),
      name,
      path,
      createdAt: createdAt ?? formattedUTCDate(),
    };
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get path() {
    return this.props.path;
  }

  get createdAt() {
    return this.props.createdAt;
  }
}

export default Image;
