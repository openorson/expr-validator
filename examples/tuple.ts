import { validator } from "../src/index";

const tuple: unknown = [];

if (validator.tuple(tuple, ["number!", "date!"])) {
  console.log(tuple);
}
