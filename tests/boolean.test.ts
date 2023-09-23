import { expect, test } from "vitest";
import { validator } from "../src/index";

test("boolean", () => {
  const data: unknown = true;
  expect(validator.boolean(data, "boolean!")).toBe(true);
});
