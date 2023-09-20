import { expect, test } from "vitest";
import { validator } from "../src/index";

test("string", () => {
  const str: unknown = "orson";
  // for (let index = 0; index < 10000000; index++) {
  //   validator.string(str, "string[]!{1-2}{size:1}(字符串)");
  // }
  expect(validator.string(str, "string[]!{1-2}{size:1}(字符串)")).toBe(true);
});
