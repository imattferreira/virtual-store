import Product from "../models/product";

export interface IProductPresentation {
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

const productPresentation = ({
  id,
  name,
  slug,
  brandId,
  description,
  formattedPrice,
  quantity,
  createdAt,
  updatedAt,
}: Product): IProductPresentation => ({
  id,
  name,
  slug,
  brandId,
  description,
  price: formattedPrice,
  quantity,
  createdAt,
  updatedAt,
});

export default productPresentation;
