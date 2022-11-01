import Brand from "../../entities/brand";
import database from "../../../../../infra/database";
import IBrandsRepository from "../interfaces/brands-repository";
import BrandMapper from "../mappers/brand-mapper";
import { StoredBrand } from "../interfaces/stored-entities";

class BrandsRepository implements IBrandsRepository {
  async create(brand: Brand): Promise<void> {
    const { created_at, id, name, updated_at } =
      BrandMapper.toPersistance(brand);

    await database.brand.create({
      data: { id, name, created_at, updated_at },
    });
  }

  async findById(id: string): Promise<Brand | null> {
    const brand = (await database.brand.findUnique({
      where: { id },
    })) as StoredBrand | null;

    if (!brand) {
      return null;
    }

    return BrandMapper.toDomain(brand);
  }

  async findByName(name: string): Promise<Brand | null> {
    const brand = (await database.brand.findUnique({
      where: { name },
    })) as StoredBrand | null;

    if (!brand) {
      return null;
    }

    return BrandMapper.toDomain(brand);
  }
}

export default new BrandsRepository();
