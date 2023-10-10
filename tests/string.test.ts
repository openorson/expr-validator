import { expect, test } from "vitest";
import { validator } from "../src/index";

test("string type test", () => {
  const data = [null, void 0, 1, true, "", "expression@validator.com"];
  expect(data.map((value) => validator.string(value, "string?"))).toStrictEqual([true, true, false, false, false, true]);
  expect(data.map((value) => validator.string(value, "string!"))).toStrictEqual([false, false, false, false, false, true]);
});

test("string length test", () => {
  const data = "0123456789";
  expect(validator.string(data, "string!{10~}")).toBe(true);
  expect(validator.string(data, "string!{~10}")).toBe(true);
  expect(validator.string(data, "string!{10~10}")).toBe(true);
});

test("string pattern test", () => {
  const [email, mobilePhone, telPhone, idNumber] = ["expression@validator.com", "13355556666", "020-12345678", "11010120000728790X"];
  expect(validator.string(email, "string!{email}")).toBe(true);
  expect(validator.string(mobilePhone, "string!{mobilePhone}")).toBe(true);
  expect(validator.string(telPhone, "string!{telPhone}")).toBe(true);
  expect(validator.string(idNumber, "string!{idNumber}")).toBe(true);
});

test("string custom pattern test", () => {
  const data = "110";
  expect(validator.string(data, "string!{/^\\d+$/}")).toBe(true);
});
