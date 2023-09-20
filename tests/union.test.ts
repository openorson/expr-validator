import { expect, test } from "vitest";
import { validator } from "../src/index";

test("union", () => {
  const arr: unknown = ["a", 1];
  expect(validator.union(arr, ["union", "string[]!", "number!"])).toBe(true);
});
