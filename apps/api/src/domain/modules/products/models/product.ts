import { formattedUTCDate } from "../../../../utils/date";
import { genUUID } from "../../../../utils/string";

interface IProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
  brandId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface ICreateProduct
  extends Omit<IProduct, "id" | "createdAt" | "updatedAt" | "slug"> {
  id?: string | null;
  slug?: string | null;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
}

class Product {
  private props: IProduct;

  constructor({
    id = null,
    name,
    description,
    brandId,
    price,
    slug,
    image,
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
      slug: slug ?? name.split(" ").join("-").toLowerCase(),
      description,
      brandId,
      image,
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

  get image(): string {
    return this.props.image;
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
