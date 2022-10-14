import Product from "../models/product";

export interface IProductPresentation {
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

const productPresentation = ({
  id,
  name,
  slug,
  brandId,
  description,
  image,
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
  image,
  price: formattedPrice,
  quantity,
  createdAt,
  updatedAt,
});

export default productPresentation;
