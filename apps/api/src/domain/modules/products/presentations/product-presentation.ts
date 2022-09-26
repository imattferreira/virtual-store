import Product from "../models/product";

export interface IProductPresentation {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  brandId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

const productPresentation = ({
  id,
  name,
  brandId,
  description,
  formattedPrice,
  quantity,
  createdAt,
  updatedAt,
}: Product): IProductPresentation => ({
  id,
  name,
  brandId,
  description,
  price: formattedPrice,
  quantity,
  createdAt,
  updatedAt,
});

export default productPresentation;
