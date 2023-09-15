import validators from "../src/index";

const email: unknown = 1;

const arr: unknown = [];
function isArr(val: unknown) {
  return Object.prototype.toString.call(val) === "[object Array]";
}

if (validators.stringValidator("string!{email}", email)) {
  console.log(email);
}
