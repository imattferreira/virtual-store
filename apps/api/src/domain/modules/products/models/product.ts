import { genUUID } from "../../../../utils/string";

interface IProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  brandName: string;
}

class Product {
  private props: IProduct;

  constructor({
    name,
    description,
    brandName,
    price,
    quantity,
  }: Omit<IProduct, "id">) {
    if (price <= 0) {
      throw new Error("invalid price");
    }

    if (quantity <= 0) {
      throw new Error("invalid quantity");
    }

    this.props = {
      id: genUUID(),
      name,
      description,
      brandName,
      price: price * 100,
      quantity,
    };
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
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

  get brandName(): string {
    return this.props.brandName;
  }
}

export default Product;
