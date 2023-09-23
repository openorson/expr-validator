import { expect, test } from "vitest";
import { validator } from "../src/index";

test("number", () => {
  const data: unknown = 12.23;
  expect(validator.number(data, "number!{1~15}{.2}", { throw: true })).toBe(true);
});
