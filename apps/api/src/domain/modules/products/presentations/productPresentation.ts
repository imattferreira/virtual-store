import Product from "../models/product";

export interface IProductPresentation {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  brandName: string;
}

const productPresentation = ({
  id,
  name,
  brandName,
  description,
  formattedPrice,
  quantity,
}: Product): IProductPresentation => ({
  id,
  name,
  brandName,
  description,
  price: formattedPrice,
  quantity,
});

export default productPresentation;
