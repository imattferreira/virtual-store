import { randomBytes } from "node:crypto";

export const genRandomInt = (min = 0, max = 1000) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const genRandomStr = (min = 1, max = 100) =>
  randomBytes(genRandomInt(min, max)).toString("base64");
