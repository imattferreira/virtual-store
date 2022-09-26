import Brand from "../../models/brand";

interface IBrandsRepository {
  create(params: Brand): Promise<void>;
  findByName(id: string): Promise<Brand | null>;
  findById(id: string): Promise<Brand | null>;
}

export default IBrandsRepository;
