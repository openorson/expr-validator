import { expect, test } from "vitest";
import { validator } from "../src/index";

test("string", () => {
  const str: unknown = "openorson@hotmail.com";
  expect(validator.string(str, "string!{email}")).toBe(true);
});
