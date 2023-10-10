import { expect, test } from "vitest";
import { validator } from "../src/index";

test("union type test", () => {
  expect(validator.union(null, ["union", "string!", "number!", "boolean!", "date!"])).toBe(false);
  expect(validator.union(void 0, ["union", "string!", "number!", "boolean!", "date!"])).toBe(false);
  expect(validator.union("1", ["union", "string!", "number!", "boolean!", "date!"])).toBe(true);
  expect(validator.union(1, ["union", "string!", "number!", "boolean!", "date!"])).toBe(true);
  expect(validator.union(true, ["union", "string!", "number!", "boolean!", "date!"])).toBe(true);
  expect(validator.union(new Date(), ["union", "string!", "number!", "boolean!", "date!"])).toBe(true);
  expect(validator.union(class {}, ["union", "string!", "number!", "boolean!", "date!"])).toBe(false);
});
