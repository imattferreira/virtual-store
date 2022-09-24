import { faker } from "@faker-js/faker";

export default Object.freeze({
  email: faker.internet.email,
  password: faker.internet.password,
});
