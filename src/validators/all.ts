import { anyValidator } from "./any";
import { booleanValidator } from "./boolean";
import { dateRangeValidator } from "./data-range";
import { dateValidator } from "./date";
import { numberValidator } from "./number";
import { numberRangeValidator } from "./number-range";
import { objectValidator } from "./object";
import { stringValidator } from "./string";
import { tupleValidator } from "./tuple";
import { unionValidator } from "./union";

export const validator = {
  string: stringValidator,
  number: numberValidator,
  numberRange: numberRangeValidator,
  boolean: booleanValidator,
  date: dateValidator,
  dateRange: dateRangeValidator,
  tuple: tupleValidator,
  union: unionValidator,
  object: objectValidator,
  any: anyValidator,
};
