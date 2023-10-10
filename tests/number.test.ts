import { expect, test } from "vitest";
import { validator } from "../src/index";

test("number type test", () => {
  expect(validator.number(null, "number?")).toBe(true);
  expect(validator.number(void 0, "number?")).toBe(true);
  expect(validator.number(1, "number?")).toBe(true);
  expect(validator.number("1", "number?")).toBe(false);

  expect(validator.number(null, "number!")).toBe(false);
  expect(validator.number(void 0, "number!")).toBe(false);
  expect(validator.number(1, "number!")).toBe(true);
  expect(validator.number("1", "number!")).toBe(false);

  expect(validator.number(null, "number[]?")).toBe(true);
  expect(validator.number(void 0, "number[]?")).toBe(true);
  expect(validator.number([], "number[]?")).toBe(true);
  expect(validator.number([1, 2, 3], "number[]?")).toBe(true);
  expect(validator.number(["1", "2", "3"], "number[]?")).toBe(false);

  expect(validator.number(null, "number[]!")).toBe(false);
  expect(validator.number(void 0, "number[]!")).toBe(false);
  expect(validator.number([], "number[]!")).toBe(true);
  expect(validator.number([1, 2, 3], "number[]!")).toBe(true);
  expect(validator.number(["1", "2", "3"], "number[]!")).toBe(false);
});

test("number size args test", () => {
  expect(validator.number(9, "number!{10~}")).toBe(false);
  expect(validator.number(10, "number!{10~}")).toBe(true);
  expect(validator.number(11, "number!{10~}")).toBe(true);

  expect(validator.number(9, "number!{~10}")).toBe(true);
  expect(validator.number(10, "number!{~10}")).toBe(true);
  expect(validator.number(11, "number!{~10}")).toBe(false);

  expect(validator.number(9, "number!{10~20}")).toBe(false);
  expect(validator.number(10, "number!{10~20}")).toBe(true);
  expect(validator.number(15, "number!{10~20}")).toBe(true);
  expect(validator.number(20, "number!{10~20}")).toBe(true);
  expect(validator.number(21, "number!{10~20}")).toBe(false);
});

test("number length args test", () => {
  expect(validator.number(1, "number!{3.}")).toBe(true);
  expect(validator.number(10, "number!{3.}")).toBe(true);
  expect(validator.number(100, "number!{3.}")).toBe(true);
  expect(validator.number(1000, "number!{3.}")).toBe(false);

  expect(validator.number(0.1, "number!{.2}")).toBe(true);
  expect(validator.number(0.11, "number!{.2}")).toBe(true);
  expect(validator.number(0.111, "number!{.2}")).toBe(false);

  expect(validator.number(1.1, "number!{3.2}")).toBe(true);
  expect(validator.number(11.11, "number!{3.2}")).toBe(true);
  expect(validator.number(111.111, "number!{3.2}")).toBe(false);
  expect(validator.number(11.111, "number!{3.2}")).toBe(false);
  expect(validator.number(111.11, "number!{3.2}")).toBe(true);
});
