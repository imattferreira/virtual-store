import Brand from "../../models/brand";
import IBrandsRepository from "../interfaces/brands-repository";
import { StoredBrand } from "../interfaces/stored-entities";
import BrandMapper from "../mappers/brand-mapper";

class FakeBrandsRepository implements IBrandsRepository {
  repository: StoredBrand[] = [];

  async create(brand: Brand): Promise<void> {
    this.repository.push(BrandMapper.toPersistance(brand));
  }

  findById(id: string): Promise<Brand | null> {
    const brand = this.repository.find(({ id: brandId }) => brandId === id);

    if (!brand) {
      return new Promise((resolve) => setTimeout(() => resolve(null), 120));
    }

    return new Promise((resolve) =>
      setTimeout(() => resolve(BrandMapper.toDomain(brand)), 120)
    );
  }

  findByName(name: string): Promise<Brand | null> {
    const brand = this.repository.find(
      ({ name: brandName }) => brandName === name
    );

    if (!brand) {
      return new Promise((resolve) => setTimeout(() => resolve(null), 120));
    }

    return new Promise((resolve) =>
      setTimeout(() => resolve(BrandMapper.toDomain(brand)), 120)
    );
  }
}

export default FakeBrandsRepository;
