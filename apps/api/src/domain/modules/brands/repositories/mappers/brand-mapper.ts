import Brand from "../../models/brand";
import { StoredBrand } from "../interfaces/stored-entities";

class BrandMapper {
  toDomain({ created_at, id, name, updated_at }: StoredBrand): Brand {
    return new Brand({
      name,
      createdAt: created_at,
      id,
      updatedAt: updated_at,
    });
  }

  toPersistance({ createdAt, id, name, updatedAt }: Brand): StoredBrand {
    return {
      created_at: createdAt,
      id,
      name,
      updated_at: updatedAt,
    };
  }
}

export default new BrandMapper();
