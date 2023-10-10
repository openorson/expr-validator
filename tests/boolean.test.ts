import { expect, test } from "vitest";
import { validator } from "../src/index";

test("boolean type test", () => {
  expect(validator.boolean(null, "boolean?")).toBe(true);
  expect(validator.boolean(void 0, "boolean?")).toBe(true);
  expect(validator.boolean(1, "boolean?")).toBe(false);
  expect(validator.boolean(true, "boolean?")).toBe(true);

  expect(validator.boolean(null, "boolean!")).toBe(false);
  expect(validator.boolean(void 0, "boolean!")).toBe(false);
  expect(validator.boolean(1, "boolean!")).toBe(false);
  expect(validator.boolean(true, "boolean!")).toBe(true);

  expect(validator.boolean(null, "boolean[]?")).toBe(true);
  expect(validator.boolean(void 0, "boolean[]?")).toBe(true);
  expect(validator.boolean([], "boolean[]?")).toBe(true);
  expect(validator.boolean([1, 2, 3], "boolean[]?")).toBe(false);
  expect(validator.boolean([true, false, true], "boolean[]?")).toBe(true);

  expect(validator.boolean(null, "boolean[]!")).toBe(false);
  expect(validator.boolean(void 0, "boolean[]!")).toBe(false);
  expect(validator.boolean([], "boolean[]!")).toBe(true);
  expect(validator.boolean([1, 2, 3], "boolean[]!")).toBe(false);
  expect(validator.boolean([true, false, true], "boolean[]!")).toBe(true);
});
