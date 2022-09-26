// TODO sanitize each param
// TODO create custom errors
import brandPresentation, {
  IBrandPresentation,
} from "../../presentations/brand-presentation";
import Validate from "../../../../validators/decorators/validate";
import Brand from "../../models/brand";
import IBrandsRepository from "../../repositories/interfaces/brands-repository";

export interface CreateBrandParams {
  name: string;
}

export class CreateBrandUseCase {
  constructor(private readonly brandsRepository: IBrandsRepository) {}

  @Validate<CreateBrandParams>({
    name: { required: true, length: { min: 0 } },
  })
  async execute({ name }: CreateBrandParams): Promise<IBrandPresentation> {
    const brandAlreadyExists = await this.brandsRepository.findByName(name);

    if (brandAlreadyExists) {
      throw new Error("brand already exists");
    }

    const brand = new Brand({
      name,
    });

    await this.brandsRepository.create(brand);

    return brandPresentation(brand);
  }
}

export default CreateBrandUseCase;
