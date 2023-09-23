import { expect, test } from "vitest";
import { validator } from "../src/index";

test("date", () => {
  const data: unknown = new Date();
  expect(validator.date(data, "date!")).toBe(true);
});
