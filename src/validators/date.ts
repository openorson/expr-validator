import { typeCheck } from "../common";
import { ValidatorExpression } from "../types/expression";
import { createValidator } from "../validator/validator";

export type DateValidatorExpression = ValidatorExpression<"date", []>;

export interface DateValidatorOptions {}

export const dateValidator = createValidator<DateValidatorExpression, DateValidatorOptions>({
  validate({ value: val, parse, transform }) {
    let value = val;
    if (transform) {
      if (Object.prototype.toString.call(value) !== "[object Date]") {
        // @ts-ignore
        value = Array.isArray(value) ? new Date(...value) : new Date(value);
      }
    }

    if (!typeCheck<Date>(value, parse, (v) => Object.prototype.toString.call(v) === "[object Date]" && !Number.isNaN((v as Date).getTime()))) {
      return { type: "invalid", comment: parse.comment };
    }

    return { type: "valid", value };
  },
});
