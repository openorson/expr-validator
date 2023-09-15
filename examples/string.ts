import { validator } from "../src/index";

const email: unknown = 1;

if (validator.any("boolean!", email)) {
  console.log(email);
}
