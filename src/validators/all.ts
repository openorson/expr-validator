import { anyValidator } from "./any";
import { booleanValidator } from "./boolean";
import { dateValidator } from "./date";
import { numberValidator } from "./number";
import { objectValidator } from "./object";
import { stringValidator } from "./string";
import { tupleValidator } from "./tuple";
import { unionValidator } from "./union";

export const validator = {
  string: stringValidator,
  number: numberValidator,
  boolean: booleanValidator,
  date: dateValidator,
  tuple: tupleValidator,
  union: unionValidator,
  object: objectValidator,
  any: anyValidator,
};
