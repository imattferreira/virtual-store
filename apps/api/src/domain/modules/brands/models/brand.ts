import { formattedUTCDate } from "../../../../utils/date";
import { genUUID } from "../../../../utils/string";

interface IBrand {
  id: string;
  name: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface ICreateBrand extends Omit<IBrand, "id" | "createdAt" | "updatedAt"> {
  id?: string | null;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
}

class Product {
  private props: IBrand;

  constructor({
    id = null,
    name,
    createdAt = null,
    updatedAt = null,
  }: ICreateBrand) {
    this.props = {
      id: id ?? genUUID(),
      name,
      createdAt: createdAt ?? formattedUTCDate(),
      updatedAt: updatedAt ?? formattedUTCDate(),
    };
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get createdAt(): Date | string {
    return this.props.createdAt;
  }

  get updatedAt(): Date | string {
    return this.props.updatedAt;
  }
}

export default Product;
