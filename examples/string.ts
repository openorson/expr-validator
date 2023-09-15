import validators from "../src/index";

const email: unknown = "x@email.com";

if (validators.stringValidator("string!{format:email}", email)) {
  console.log(email);
}
