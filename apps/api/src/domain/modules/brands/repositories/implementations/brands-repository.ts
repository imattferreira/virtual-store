import Brand from "../../models/brand";
import database from "../../../../../infra/database";
import IBrandsRepository from "../interfaces/brands-repository";

class BrandsRepository implements IBrandsRepository {
  async create({ id, name, createdAt, updatedAt }: Brand): Promise<void> {
    database.brand.create({
      data: { id, name, createdAt, updatedAt },
    });
  }

  async findById(id: string): Promise<Brand | null> {
    const brand = await database.brand.findUnique({ where: { id } });

    if (!brand) {
      return null;
    }

    return new Brand(brand);
  }

  async findByName(name: string): Promise<Brand | null> {
    const brand = await database.brand.findUnique({ where: { name } });

    if (!brand) {
      return null;
    }

    return new Brand(brand);
  }
}

export default new BrandsRepository();
