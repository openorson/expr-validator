import { expect, test } from "vitest";
import { validator } from "../src/index";

test("string type test", () => {
  expect(validator.string(null, "string?")).toBe(true);
  expect(validator.string(void 0, "string?")).toBe(true);
  expect(validator.string(1, "string?")).toBe(false);
  expect(validator.string("1", "string?")).toBe(true);

  expect(validator.string(null, "string!")).toBe(false);
  expect(validator.string(void 0, "string!")).toBe(false);
  expect(validator.string(1, "string!")).toBe(false);
  expect(validator.string("1", "string!")).toBe(true);

  expect(validator.string(null, "string[]?")).toBe(true);
  expect(validator.string(void 0, "string[]?")).toBe(true);
  expect(validator.string([], "string[]?")).toBe(true);
  expect(validator.string([1, 2, 3], "string[]?")).toBe(false);
  expect(validator.string(["1", "2", "3"], "string[]?")).toBe(true);

  expect(validator.string(null, "string[]!")).toBe(false);
  expect(validator.string(void 0, "string[]!")).toBe(false);
  expect(validator.string([], "string[]!")).toBe(true);
  expect(validator.string([1, 2, 3], "string[]!")).toBe(false);
  expect(validator.string(["1", "2", "3"], "string[]!")).toBe(true);
});

test("string length args test", () => {
  expect(validator.string("a", "string!{2~}")).toBe(false);
  expect(validator.string("ab", "string!{2~}")).toBe(true);
  expect(validator.string("abc", "string!{2~}")).toBe(true);

  expect(validator.string("a", "string!{~2}")).toBe(true);
  expect(validator.string("ab", "string!{~2}")).toBe(true);
  expect(validator.string("abc", "string!{~2}")).toBe(false);

  expect(validator.string("a", "string!{2~2}")).toBe(false);
  expect(validator.string("ab", "string!{2~2}")).toBe(true);
  expect(validator.string("abc", "string!{2~2}")).toBe(false);
});

test("string custom pattern args test", () => {
  expect(validator.string("110", "string!{/^\\d+$/}")).toBe(true);
});

test("string pattern args test", () => {
  const [email, mobilePhone, telPhone, idNumber] = ["expression@validator.com", "13355556666", "020-12345678", "11010120000728790X"];
  expect(validator.string(email, "string!{email}")).toBe(true);
  expect(validator.string(mobilePhone, "string!{mobilePhone}")).toBe(true);
  expect(validator.string(telPhone, "string!{telPhone}")).toBe(true);
  expect(validator.string(idNumber, "string!{idNumber}")).toBe(true);
});
