import { expect, test } from "vitest";
import { validator } from "../src/index";

test("tuple type test", () => {
  expect(validator.tuple(null, ["tuple", "string!", "number!", "boolean!", "date!"])).toBe(false);
  expect(validator.tuple(void 0, ["tuple", "string!", "number!", "boolean!", "date!"])).toBe(false);
  expect(validator.tuple([], ["tuple", "string!", "number!", "boolean!", "date!"])).toBe(false);
  expect(validator.tuple(["a", 1, true, false], ["tuple", "string!", "number!", "boolean!", "date!"])).toBe(false);
  expect(validator.tuple(["a", 1, true, new Date()], ["tuple", "string!", "number!", "boolean!", "date!"])).toBe(true);
});
