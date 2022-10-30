import Product from "../../models/product";
import { StoredProduct } from "../interfaces/stored-entities";

class ProductMapper {
  toDomain({
    brand_id,
    created_at,
    description,
    id,
    image,
    name,
    price,
    quantity,
    slug,
    updated_at,
  }: StoredProduct): Product {
    return new Product({
      brandId: brand_id,
      description,
      image,
      name,
      price,
      quantity,
      slug,
      createdAt: created_at,
      id,
      updatedAt: updated_at,
    });
  }

  toPersistance({
    brandId,
    createdAt,
    description,
    formattedPrice,
    id,
    image,
    name,
    price,
    quantity,
    slug,
    updatedAt,
  }: Product) {
    return {
      brand_id: brandId,
      created_at: createdAt,
      description,
      id,
      image,
      name,
      price, // TODO transform to integer
      quantity,
      slug,
      updated_at: updatedAt,
    };
  }
}

export default new ProductMapper();
