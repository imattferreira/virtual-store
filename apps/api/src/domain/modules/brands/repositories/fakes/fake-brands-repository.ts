import Brand from "../../models/brand";
import IBrandsRepository from "../interfaces/brands-repository";

class FakeBrandsRepository implements IBrandsRepository {
  repository: Brand[] = [];

  async create(brand: Brand): Promise<void> {
    this.repository.push(brand);
  }

  findById(id: string): Promise<Brand | null> {
    const brand = this.repository.find(({ id: brandId }) => brandId === id);

    if (!brand) {
      return new Promise((resolve) => setTimeout(() => resolve(null), 120));
    }

    return new Promise((resolve) =>
      setTimeout(() => resolve(new Brand(brand)), 120)
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
      setTimeout(() => resolve(new Brand(brand)), 120)
    );
  }
}

export default FakeBrandsRepository;
