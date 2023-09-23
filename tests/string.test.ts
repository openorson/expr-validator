import { expect, test } from "vitest";
import { validator } from "../src/index";

test("string", () => {
  const str: unknown = "orson@hotmail.com";
  expect(validator.string(str, "string!{email}(字符)", { throw: true })).toBe(true);
});
