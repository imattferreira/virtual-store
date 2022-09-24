import { describe, it, expect } from "vitest";
import { hasValidRange } from "./number";

const genRandomInt = (min = 0, max = 1000) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

describe("[number validator]", () => {
  describe("[hasValidRange]", () => {
    it("should return true when the number is bigger than min range", () => {
      const min = 10;
      const num = genRandomInt(10);

      const result = hasValidRange(num, { min });

      expect(result).toBeTruthy();
    });

    it("should return false when the number is less than min range", () => {
      const min = 20;
      const num = genRandomInt(0, 10);

      const result = hasValidRange(num, { min });

      expect(result).toBeFalsy();
    });

    it("should return true when the number is less than max range", () => {
      const max = 10;
      const num = genRandomInt(0, 10);

      const result = hasValidRange(num, { max });

      expect(result).toBeTruthy();
    });

    it("should return false when the number is bigger than max range", () => {
      const max = 5;
      const num = genRandomInt(10, 20);

      const result = hasValidRange(num, { max });

      expect(result).toBeFalsy();
    });

    it("should return true when the number is bigger than min and less than max ranges", () => {
      const min = 5;
      const max = 100;
      const num = genRandomInt(10, 50);

      const result = hasValidRange(num, { min, max });

      expect(result).toBeTruthy();
    });
  });
});
