import Brand from "../../entities/brand";

interface IBrandsRepository {
  create(params: Brand): Promise<void>;
  findByName(id: string): Promise<Brand | null>;
  findById(id: string): Promise<Brand | null>;
}

export default IBrandsRepository;
