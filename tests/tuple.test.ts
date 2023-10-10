import { expect, test } from "vitest";
import { validator } from "../src/index";

test("tuple", () => {
  const data = ["validator", 1, true, new Date()];
  expect(validator.tuple(data, ["tuple", "string!", "number!", "boolean!", "date!"])).toBe(true);
});
