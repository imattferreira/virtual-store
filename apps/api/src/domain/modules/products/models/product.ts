import { formattedUTCDate } from "../../../../utils/date";
import { genUUID } from "../../../../utils/string";

interface IProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  description: string;
  brandId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface ICreateProduct
  extends Omit<IProduct, "id" | "createdAt" | "updatedAt"> {
  id?: string | null;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
}

class Product {
  private props: IProduct;

  constructor({
    id = null,
    name,
    slug,
    description,
    brandId,
    price,
    quantity,
    createdAt = null,
    updatedAt = null,
  }: ICreateProduct) {
    if (price <= 0) {
      throw new Error("invalid price");
    }

    if (quantity <= 0) {
      throw new Error("invalid quantity");
    }

    this.props = {
      id: id ?? genUUID(),
      name,
      slug,
      description,
      brandId,
      price: price * 100,
      quantity,
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

  get slug() {
    return this.props.slug;
  }

  get price(): number {
    return this.props.price;
  }

  get formattedPrice(): number {
    return this.props.price / 100;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get description(): string {
    return this.props.description;
  }

  get brandId(): string {
    return this.props.brandId;
  }

  get createdAt(): Date | string {
    return this.props.createdAt;
  }

  get updatedAt(): Date | string {
    return this.props.updatedAt;
  }
}

export default Product;
