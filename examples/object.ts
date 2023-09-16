import { validator } from "../src/index";

const object: unknown = {
  a: 1,
  b: 2,
};

if (
  validator.object(object, {
    a: "number!",
    b: "number!",
    c: {
      d: "boolean[]?",
      e: "dateRange!",
      f: {
        g: "numberRange?{currency}",
        a: {
          b: {
            c: {
              d: "number!",
            },
          },
        },
      },
    },
  })
) {
  console.log(object.c.f.a.b.c.d);
}
