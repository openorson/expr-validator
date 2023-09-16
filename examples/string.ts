import { validator } from "../src/index";

const email: unknown = 1;

const [a, b] = validator.string.parse("", "string[]?");

if (a) {
  b;
}

if (validator.string(email, "string[]!{1-2}")) {
  console.log(email);
}
