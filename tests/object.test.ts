import { expect, test } from "vitest";
import { validator } from "../src/index";

test("object", () => {
  const data = { a: true, b: { c: "1" } };
  expect(validator.object(data, { a: "boolean!", b: { c: "string!" } }, { throw: true })).toBe(true);
});
