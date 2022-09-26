import { describe, it, expect } from "../../tests";
import faker from "../../tests/fakes";
import { genRandomInt, genRandomStr } from "../../tests/utils";
import {
  hasValidLengthRange,
  isEmailValid,
  isIdValid,
  isPasswordValid,
} from "./string";

describe("[string validator]", () => {
  describe("[hasValidLengthRange]", () => {
    it.concurrent(
      "should return true when the string is bigger than min range",
      () => {
        const min = 10;
        const str = genRandomStr(20);

        const result = hasValidLengthRange(str, { min });

        expect(result).toBeTruthy();
      }
    );

    it("should return false when the string is less than min range", () => {
      const min = 20;
      const str = genRandomStr(0, 10);

      const result = hasValidLengthRange(str, { min });

      expect(result).toBeFalsy();
    });

    it("should return true when the string is less than max range", () => {
      const max = 110;
      const str = genRandomStr(0, 70);

      const result = hasValidLengthRange(str, { max });

      expect(result).toBeTruthy();
    });

    it("should return false when the string is bigger than max range", () => {
      const max = 10;
      const str = genRandomStr(100);

      const result = hasValidLengthRange(str, { max });

      expect(result).toBeFalsy();
    });

    it("should return true when the string is bigger than min and less than max range", () => {
      const min = 20;
      const max = 60;
      const str = genRandomStr(30, 50);

      const result = hasValidLengthRange(str, { min, max });

      expect(result).toBeTruthy();
    });
  });

  describe("[isEmailValid]", () => {
    it("should return true when the param is a valid email", () => {
      const param = faker.email();

      const result = isEmailValid(param);

      expect(result).toBeTruthy();
    });

    it("should return false when the param don't has '@'", () => {
      const param = `${genRandomStr(10, 30)}.com`;

      const result = isEmailValid(param);

      expect(result).toBeFalsy();
    });

    it("should return false when the param don't has '.'", () => {
      const param = genRandomStr(10, 30);

      const result = isEmailValid(param);

      expect(result).toBeFalsy();
    });
  });

  describe("[isPasswordValid]", () => {
    it("should return true when the param is a valid password", () => {
      const param = `${faker.password(18)}#2!`;

      const result = isPasswordValid(param);

      expect(result).toBeTruthy();
    });

    it("should return false when the param has less than 8 characters", () => {
      const param = faker.password(6);

      const result = isPasswordValid(param);

      expect(result).toBeFalsy();
    });

    it("should return false when the param don't has least 1 character", () => {
      const param = `${genRandomInt(10, 15)}_.#`;

      const result = isPasswordValid(param);

      expect(result).toBeFalsy();
    });

    it("should return false when the param don't has least 1 number", () => {
      const param = `${genRandomStr(10, 20)}$#2.#`;

      const result = isPasswordValid(param);

      expect(result).toBeFalsy();
    });

    it("should return false when the param don't has least 1 symbol", () => {
      const param = `eqweERaserAdadasdEERAEadadsdsdadaeawe${genRandomInt(
        1,
        10
      )}`;

      const result = isPasswordValid(param);

      expect(result).toBeFalsy();
    });
  });

  describe("[isIdValid]", () => {
    it.concurrent(
      "should return true when the param is a valid UUID v4",
      () => {
        const param = faker.id();

        const result = isIdValid(param);

        expect(result).toBeTruthy();
      }
    );

    it("should return false when the param has less than of four dashes", () => {
      const param = faker.id().split("-").slice(0, 3).join("-");

      const result = isIdValid(param);

      expect(result).toBeFalsy();
    });

    it("should return false when the param has special characters different of dashes", () => {
      const param = faker.id().replace(/[0-9]/i, "#");

      const result = isIdValid(param);

      expect(result).toBeFalsy();
    });
  });
});
