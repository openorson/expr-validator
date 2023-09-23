import { expect, test } from "vitest";
import { validator } from "../src/index";

test("union", () => {
  const data: unknown = 1;
  expect(validator.union(data, ["union", "string!", "number!"], { throw: true })).toBe(true);
});
