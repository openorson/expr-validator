import { expect, test } from "vitest";
import { validator } from "../src/index";

test("number", () => {
  const data: unknown = [1];
  expect(validator.number(data, "number[]?")).toBe(true);
});
