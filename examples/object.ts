import { validator } from "../src/index";

const object: unknown = {
  a: 1,
  b: 2,
};

if (
  validator.object(object, {
    a: "number!",
    b: {
      c: ["date!", "number!"],
    },
  })
) {
  console.log(object.b.c);
}
