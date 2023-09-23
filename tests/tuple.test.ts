import { expect, test } from "vitest";
import { validator } from "../src/index";

test("tuple", () => {
  const data: unknown = [true, 1, "a"];
  expect(validator.tuple(data, ["tuple", "boolean!(1)", "number!(2)", "string!(3)"], { throw: true })).toBe(true);
});
