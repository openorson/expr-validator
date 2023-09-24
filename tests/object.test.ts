import { expect, test } from "vitest";
import { validator } from "../src/index";

test("object", () => {
  const obj: unknown = { a: true, b: { c: "a" } };
  expect(validator.object(obj, { a: "boolean!", b: { c: "string!" } }, { throw: true })).toBe(true);
});
