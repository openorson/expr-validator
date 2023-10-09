import { expect, test } from "vitest";
import { validator } from "../src/index";

test("number", () => {
  const data: unknown = 1.5;
  expect(validator.number(data, "number?{1~2}")).toBe(true);
});
