import { expect, test } from "vitest";
import { validator } from "../src/index";

test("object validate test", () => {
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

test("object transform test", () => {
  expect(
    validator.object.transform(
      {
        a: {
          b: {
            c: {
              d: true,
            },
          },
          e: "validator",
          f: {
            g: "1",
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
          e: "string!",
          f: {
            g: "number!",
          },
        },
      }
    )
  ).toStrictEqual([
    true,
    {
      a: {
        b: {
          c: {
            d: true,
          },
        },
        e: "validator",
        f: {
          g: 1,
        },
      },
    },
  ]);
});
