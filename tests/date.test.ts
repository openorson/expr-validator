import { expect, test } from "vitest";
import { validator } from "../src/index";

test("date type test", () => {
  expect(validator.date(null, "date?")).toBe(true);
  expect(validator.date(void 0, "date?")).toBe(true);
  expect(validator.date(new Date(), "date?")).toBe(true);
  expect(validator.date("1", "date?")).toBe(false);

  expect(validator.date(null, "date!")).toBe(false);
  expect(validator.date(void 0, "date!")).toBe(false);
  expect(validator.date(new Date(), "date!")).toBe(true);
  expect(validator.date("1", "date!")).toBe(false);

  expect(validator.date(null, "date[]?")).toBe(true);
  expect(validator.date(void 0, "date[]?")).toBe(true);
  expect(validator.date([], "date[]?")).toBe(true);
  expect(validator.date([new Date(), new Date(), new Date()], "date[]?")).toBe(true);
  expect(validator.date(["1", "2", "3"], "date[]?")).toBe(false);

  expect(validator.date(null, "date[]!")).toBe(false);
  expect(validator.date(void 0, "date[]!")).toBe(false);
  expect(validator.date([], "date[]!")).toBe(true);
  expect(validator.date([new Date(), new Date(), new Date()], "date[]!")).toBe(true);
  expect(validator.date(["1", "2", "3"], "date[]!")).toBe(false);
});
