import { validator } from "../src/index";

const email: unknown = 1;

if (validator.any(email, "string[]?{format:url}")) {
  console.log(email);
}
