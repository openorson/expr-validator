import { anyValidator } from "./any";
import { booleanValidator } from "./boolean";
import { dateRangeValidator } from "./data-range";
import { dateValidator } from "./date";
import { numberValidator } from "./number";
import { numberRangeValidator } from "./number-range";
import { objectValidator } from "./object";
import { stringValidator } from "./string";
import { tupleValidator } from "./tuple";

export const validator = {
  string: stringValidator,
  number: numberValidator,
  numberRange: numberRangeValidator,
  boolean: booleanValidator,
  date: dateValidator,
  dateRange: dateRangeValidator,
  any: anyValidator,
  tuple: tupleValidator,
  object: objectValidator,
};
