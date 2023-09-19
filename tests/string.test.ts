import { expect, test } from "vitest";
import { validator } from "../src/index";

test("string", () => {
  const str: unknown = "orson";
  expect(validator.string(str, "string[]?{1-10}{size:100}")).toBe(true);
});
