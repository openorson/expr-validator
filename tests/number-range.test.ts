import { expect, test } from "vitest";
import { validator } from "../src/index";

test("numberRange", () => {
  const data: unknown = [12.23, 12.23];
  expect(validator.numberRange(data, "numberRange!{1~15}{.2}", { throw: true })).toBe(true);
});
