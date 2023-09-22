import { expect, test } from "vitest";
import { validator } from "../src/index";

test("string", () => {
  const str: unknown = "1";
  expect(validator.string(str, "string!(字符字段)", { throw: true })).toBe(true);
});
