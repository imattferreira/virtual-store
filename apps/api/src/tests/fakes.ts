import { faker } from "@faker-js/faker";
import { genUUID } from "../utils/string";

export default Object.freeze({
  email: faker.internet.email,
  password: faker.internet.password,
  id: genUUID,
});
