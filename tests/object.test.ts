import { expect, test } from "vitest";
import { validator } from "../src/index";

test("object", () => {
  expect(
    validator.object(
      {
        a: {
          b: {
            c: {
              d: true,
            },
          },
        },
      },
      {
        a: {
          b: {
            c: {
              d: "boolean!",
            },
          },
        },
      }
    )
  ).toBe(true);
});
